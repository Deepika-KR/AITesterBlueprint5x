export interface LoginCredentials {
  email: string;
  password: string;
}

function environmentValue(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export const testData = {
  loginUrl: environmentValue("VWO_LOGIN_URL") || "https://app.wingify.com/#/login",
  validLogin: {
    email: environmentValue("VWO_LOGIN_EMAIL"),
    password: process.env.VWO_LOGIN_PASSWORD ?? "",
  },
  dashboardUrlPattern: environmentValue("VWO_DASHBOARD_URL_PATTERN"),
  runAuthNegativeTests: process.env.VWO_RUN_AUTH_NEGATIVE_TESTS === "true",
  testAccountEmail: environmentValue("VWO_TEST_ACCOUNT_EMAIL"),
  testPassword: process.env.VWO_TEST_PASSWORD ?? "",
  invalidEmail: environmentValue("VWO_INVALID_EMAIL"),
  invalidPassword: process.env.VWO_INVALID_PASSWORD ?? "",
};
