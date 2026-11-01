import { test, expect } from "../fixtures/test-fixtures";
import { testData } from "../utils/test-data";

test.describe("VWO login page", () => {
  test("shows the login form and available recovery links", async ({
    loginPage,
  }) => {
    await expect(loginPage.page).toHaveURL(/#\/login$/);
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPasswordButton).toBeVisible();
    await expect(loginPage.freeTrialLink).toHaveCount(1);
    await expect(loginPage.freeTrialLink).toBeVisible();
  });

  test("accepts input and keeps the password masked until revealed", async ({
    loginPage,
  }) => {
    await loginPage.enterEmail("qa.user@example.invalid");
    await loginPage.enterPassword("not-a-real-password");

    await expect(loginPage.email).toHaveValue("qa.user@example.invalid");
    await expect(loginPage.password).toHaveAttribute("type", "password");

    await loginPage.togglePasswordVisibility();
    await expect(loginPage.password).toHaveAttribute("type", "text");

    await loginPage.togglePasswordVisibility();
    await expect(loginPage.password).toHaveAttribute("type", "password");
  });

  test("can select and clear Remember me", async ({ loginPage }) => {
    await loginPage.setRememberMe(true);
    await expect(loginPage.rememberMe).toBeChecked();

    await loginPage.setRememberMe(false);
    await expect(loginPage.rememberMe).not.toBeChecked();
  });

  test("opens the verified Forgot Password route", async ({ loginPage }) => {
    await loginPage.openForgotPassword();
    await expect(loginPage.page).toHaveURL(/#\/forgot-password$/);
  });
});

test.describe("VWO authenticated login", () => {
  const { email, password } = testData.validLogin;
  const dashboardPattern = testData.dashboardUrlPattern;
  test.skip(
    !email || !password || !dashboardPattern,
    "Set VWO_LOGIN_EMAIL, VWO_LOGIN_PASSWORD, and VWO_DASHBOARD_URL_PATTERN to run this account-dependent test.",
  );

  test("authenticates and leaves the login page for the configured dashboard", async ({
    loginPage,
  }) => {
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.submitLogin();
    await expect(loginPage.page).toHaveURL(new RegExp(dashboardPattern));
  });
});
