import type { Locator, Page } from "@playwright/test";
import { testData } from "../utils/test-data";

export class LoginPage {
  readonly page: Page;
  readonly form: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly rememberMe: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordButton: Locator;
  readonly freeTrialLink: Locator;
  readonly passwordVisibilityButton: Locator;
  readonly validationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator(
      'xpath=//form[.//input[@type="password" and @placeholder="Enter password"]]',
    );
    this.email = this.form.locator('xpath=.//input[@type="email"]');
    this.password = this.form.locator(
      'xpath=.//input[@type="password" and @placeholder="Enter password"]',
    );
    this.rememberMe = this.form.locator('xpath=.//input[@type="checkbox"]');
    this.loginButton = this.form.locator('xpath=.//button[@type="submit"]');
    this.forgotPasswordButton = this.form.locator(
      'xpath=.//button[normalize-space(.)="Forgot Password?"]',
    );
    this.freeTrialLink = page
      .locator(
        'xpath=//main[@aria-label="Application main content"]//a[@target="_blank" and contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "start a free trial")]',
      )
      .filter({ visible: true });
    this.passwordVisibilityButton = this.form.locator(
      'xpath=.//button[@aria-label="Toggle password visibility"]',
    );
    this.validationMessage = page.locator(
      'xpath=//div[@data-qa="rixawilomi"]',
    );
  }

  async goto(): Promise<void> {
    await this.withDiagnostics("navigate to the VWO login page", async () => {
      await this.page.goto(testData.loginUrl, { waitUntil: "domcontentloaded" });
      await this.ensureUniqueVisible(this.form, "login form");
    });
  }

  async enterEmail(email: string): Promise<void> {
    await this.withDiagnostics("enter the email address", async () => {
      await this.ensureUniqueVisible(this.email, "email field");
      await this.email.fill(email);
    });
  }

  async enterPassword(password: string): Promise<void> {
    await this.withDiagnostics("enter the password", async () => {
      await this.ensureUniqueVisible(this.password, "password field");
      await this.password.fill(password);
    });
  }

  async setRememberMe(checked: boolean): Promise<void> {
    await this.withDiagnostics("change Remember me", async () => {
      await this.ensureUniqueVisible(this.rememberMe, "Remember me checkbox");
      if (checked) {
        await this.rememberMe.check();
      } else {
        await this.rememberMe.uncheck();
      }
    });
  }

  async submitLogin(): Promise<void> {
    await this.withDiagnostics("submit the login form", async () => {
      await this.ensureUniqueVisible(this.loginButton, "Sign in button");
      await this.loginButton.click();
    });
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.withDiagnostics("toggle password visibility", async () => {
      await this.ensureUniqueVisible(
        this.passwordVisibilityButton,
        "password visibility button",
      );
      await this.passwordVisibilityButton.click();
    });
  }

  async openForgotPassword(): Promise<void> {
    await this.withDiagnostics("open Forgot Password", async () => {
      await this.ensureUniqueVisible(
        this.forgotPasswordButton,
        "Forgot Password button",
      );
      await this.forgotPasswordButton.click();
    });
  }

  async getValidationMessage(): Promise<string> {
    return this.withDiagnostics(
      "read the login validation message",
      async () => {
        await this.ensureUniqueVisible(
          this.validationMessage,
          "login validation message",
        );
        return (await this.validationMessage.innerText()).trim();
      },
    );
  }

  private async ensureUniqueVisible(
    locator: Locator,
    description: string,
  ): Promise<void> {
    await locator.first().waitFor({ state: "visible" });
    const count = await locator.count();
    if (count !== 1) {
      throw new Error(`Expected one visible ${description}; found ${count}.`);
    }
  }

  private async withDiagnostics<T>(
    operation: string,
    action: () => Promise<T>,
  ): Promise<T> {
    try {
      return await action();
    } catch (error) {
      throw new Error(`Unable to ${operation} at ${this.page.url()}.`, {
        cause: error,
      });
    }
  }
}
