# VWO Playwright Framework

TypeScript Playwright Test framework for the VWO login page at
`https://app.wingify.com/#/login`. The login form, field placeholders,
password-visibility control, Remember me control, Forgot Password route, and
authentication rejection message were checked against the live application
before the XPath locators were added. The workspace did not contain a separate
VWO PRD or authorized test credentials.

The framework uses XPath locators only. Page actions check locator uniqueness
before interaction, rely on Playwright auto-waiting, and preserve the original
error as the cause when an operation fails.

## Install

```powershell
npm install
npx playwright install
Copy-Item .env.example .env
```

Set `VWO_LOGIN_EMAIL`, `VWO_LOGIN_PASSWORD`, and
`VWO_DASHBOARD_URL_PATTERN` in `.env` to enable the successful-authentication
test. The dashboard URL pattern must be supplied from an authorized account's
verified behavior; the framework does not guess it.

## Run

```powershell
npm test
npm run test:valid
npm run test:invalid
npm run test:headed
npm run test:debug
npm run typecheck
```

`test:headed` launches Chromium in headed mode. The normal suites also include
Firefox and WebKit projects; install their browsers with `npx playwright
install` before running them.

Tests that submit authentication requests are skipped unless
`VWO_RUN_AUTH_NEGATIVE_TESTS=true` is explicitly set. Configure the relevant
`VWO_TEST_*` and `VWO_INVALID_*` values only for an authorized test account.
This avoids sending unsolicited invalid login attempts to the live service.

## Allure reports

```powershell
npm run allure:generate
npm run allure:open
```

The Allure reporter records test titles, outcomes, and failures. Playwright
retains screenshots, traces, and video on failure; the shared fixture also
attaches browser console, page-error, and failed-request diagnostics without
recording request URLs or form values. Test artifacts are written to
`allure-results/`, `allure-report/`, and `test-results/`.

## Scope and limitations

Successful login, dashboard access, Remember me persistence after
authentication, rate limiting, MFA, SSO, session security, encryption, and
backend compliance require application behavior and/or authorized test data
that was not available during framework setup. The included checks do not claim
to verify those properties.
