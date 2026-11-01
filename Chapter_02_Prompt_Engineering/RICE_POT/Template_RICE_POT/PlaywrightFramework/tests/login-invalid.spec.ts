import { test, expect } from "../fixtures/test-fixtures";
import { testData } from "../utils/test-data";

async function expectAuthenticationRejected(
  loginPage: import("../pages/LoginPage").LoginPage,
): Promise<void> {
  await loginPage.submitLogin();
  await expect(loginPage.validationMessage).toBeVisible();
  await expect(loginPage.validationMessage).not.toBeEmpty();
  await expect(loginPage.page).toHaveURL(/#\/login$/);
}

test.describe("VWO authentication rejection scenarios", () => {
  test.skip(
    !testData.runAuthNegativeTests,
    "Set VWO_RUN_AUTH_NEGATIVE_TESTS=true to run authentication rejection scenarios.",
  );

  test("rejects an invalid email with a configured test password", async ({
    loginPage,
  }) => {
    test.skip(
      !testData.runAuthNegativeTests ||
        !testData.invalidEmail ||
        !testData.testPassword,
      "Opt in with VWO_RUN_AUTH_NEGATIVE_TESTS=true and configure VWO_INVALID_EMAIL and VWO_TEST_PASSWORD.",
    );

    await loginPage.enterEmail(testData.invalidEmail);
    await loginPage.enterPassword(testData.testPassword);
    await expectAuthenticationRejected(loginPage);
  });

  test("rejects a configured test email with an invalid password", async ({
    loginPage,
  }) => {
    test.skip(
      !testData.runAuthNegativeTests ||
        !testData.testAccountEmail ||
        !testData.invalidPassword,
      "Opt in with VWO_RUN_AUTH_NEGATIVE_TESTS=true and configure VWO_TEST_ACCOUNT_EMAIL and VWO_INVALID_PASSWORD.",
    );

    await loginPage.enterEmail(testData.testAccountEmail);
    await loginPage.enterPassword(testData.invalidPassword);
    await expectAuthenticationRejected(loginPage);
  });

  test("rejects both configured invalid credentials", async ({ loginPage }) => {
    test.skip(
      !testData.runAuthNegativeTests ||
        !testData.invalidEmail ||
        !testData.invalidPassword,
      "Opt in with VWO_RUN_AUTH_NEGATIVE_TESTS=true and configure VWO_INVALID_EMAIL and VWO_INVALID_PASSWORD.",
    );

    await loginPage.enterEmail(testData.invalidEmail);
    await loginPage.enterPassword(testData.invalidPassword);
    await expectAuthenticationRejected(loginPage);
  });

  test("rejects an empty email with a configured test account", async ({
    loginPage,
  }) => {
    test.skip(
      !testData.runAuthNegativeTests ||
        !testData.testAccountEmail ||
        !testData.testPassword,
      "Opt in with VWO_RUN_AUTH_NEGATIVE_TESTS=true and configure VWO_TEST_ACCOUNT_EMAIL and VWO_TEST_PASSWORD.",
    );

    await loginPage.enterPassword(testData.testPassword);
    await expectAuthenticationRejected(loginPage);
  });

  test("rejects an empty password with a configured test account", async ({
    loginPage,
  }) => {
    test.skip(
      !testData.runAuthNegativeTests || !testData.testAccountEmail,
      "Opt in with VWO_RUN_AUTH_NEGATIVE_TESTS=true and configure VWO_TEST_ACCOUNT_EMAIL.",
    );

    await loginPage.enterEmail(testData.testAccountEmail);
    await expectAuthenticationRejected(loginPage);
  });

  test("rejects empty credentials", async ({ loginPage }) => {
    test.skip(
      !testData.runAuthNegativeTests,
      "Set VWO_RUN_AUTH_NEGATIVE_TESTS=true to submit an empty authentication request.",
    );

    await expectAuthenticationRejected(loginPage);
  });

  test("rejects an invalid email format", async ({ loginPage }) => {
    test.skip(
      !testData.runAuthNegativeTests,
      "Set VWO_RUN_AUTH_NEGATIVE_TESTS=true to submit an invalid email to the authentication service.",
    );

    await loginPage.enterEmail("not-an-email");
    await expectAuthenticationRejected(loginPage);
  });
});
