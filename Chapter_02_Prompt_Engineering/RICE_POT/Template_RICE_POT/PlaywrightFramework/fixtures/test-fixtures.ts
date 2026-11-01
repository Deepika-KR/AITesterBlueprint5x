import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

interface FrameworkFixtures {
  loginPage: LoginPage;
}

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use, testInfo) => {
    const diagnostics: string[] = [];
    page.on("console", (message) => {
      diagnostics.push(`[console:${message.type()}] ${message.text()}`);
    });
    page.on("pageerror", (error) => {
      diagnostics.push(`[pageerror] ${error.message}`);
    });
    page.on("requestfailed", (request) => {
      diagnostics.push(
        `[requestfailed:${request.method()}] ${request.failure()?.errorText ?? "unknown failure"}`,
      );
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);

    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach("browser-diagnostics.txt", {
        body: Buffer.from(
          diagnostics.length > 0
            ? diagnostics.join("\n")
            : "No browser diagnostics were captured.",
        ),
        contentType: "text/plain",
      });
    }
  },
});

export { expect };
