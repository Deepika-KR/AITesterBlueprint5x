# VWO Playwright Automation Framework

A TypeScript UI automation framework built with Playwright Test for the VWO
login page: <https://app.wingify.com/#/login>.

The login form, its email and password fields, Remember me control, password
visibility control, Forgot Password route, trial link, and observed
authentication rejection message were checked against the live application.
The framework uses XPath locators, the Page Object Model, reusable fixtures,
Playwright auto-waiting, and web-first assertions. It does not invent
credentials or assert an unverified dashboard route.

## Requirements

- Node.js and npm
- Playwright-supported browsers (Chromium, Firefox, WebKit)
- Windows PowerShell commands below; equivalent npm commands work on other
  platforms

## Install

From this directory:

```powershell
npm install
npx playwright install
Copy-Item .env.example .env
```

`npx playwright install` installs browsers for all configured projects. If you
only need the headed Chromium run, install Chromium with
`npx playwright install chromium`.

## Configuration

Set values in `.env` as needed. Do not commit `.env` or real credentials.

| Variable | Purpose |
| --- | --- |
| `VWO_LOGIN_URL` | Login URL; defaults to `https://app.wingify.com/#/login`. |
| `VWO_LOGIN_EMAIL` | Authorized account email for the successful-login test. |
| `VWO_LOGIN_PASSWORD` | Password for the successful-login test. |
| `VWO_DASHBOARD_URL_PATTERN` | Verified URL pattern expected after successful login. |
| `VWO_RUN_AUTH_NEGATIVE_TESTS` | Set to `true` to opt in to authentication rejection submissions. |
| `VWO_TEST_ACCOUNT_EMAIL` | Authorized test account email for selected negative scenarios. |
| `VWO_TEST_PASSWORD` | Password value used by selected negative scenarios. |
| `VWO_INVALID_EMAIL` | Invalid email value used by selected negative scenarios. |
| `VWO_INVALID_PASSWORD` | Invalid password value used by selected negative scenarios. |

Successful authentication is skipped unless the email, password, and verified
dashboard URL pattern are all provided. Authentication rejection scenarios
are skipped unless explicitly enabled with
`VWO_RUN_AUTH_NEGATIVE_TESTS=true`; configure test values only for an account
you are authorized to exercise.

## Run tests

```powershell
# Run all configured tests in Chromium, Firefox, and WebKit
npm test

# Run the positive/UI tests only
npm run test:valid

# Run authentication rejection tests only
npm run test:invalid

# Run tests in a visible Chromium browser
npm run test:headed

# Launch Playwright Inspector for Chromium
npm run test:debug

# Type-check the TypeScript project without emitting JavaScript
npm run typecheck
```

The current tests cover login-page visibility, email/password input,
password masking and visibility toggle, Remember me selection, the verified
Forgot Password route, and opt-in authentication cases. Authentication and
dashboard tests depend on authorized test data and may be skipped when it is
not configured.

## Allure reports

Test execution writes Allure result files to `allure-results/`.

```powershell
# Generate or replace the HTML report
npm run allure:generate

# Open the generated report
npm run allure:open
```

The Allure reporter records test titles, outcomes, and failure details.
Playwright captures screenshots, traces, and video on failure in
`test-results/`. The fixture attaches browser console messages, page errors,
and failed-request diagnostics on test failures.

## Project layout

```text
PlaywrightFramework/
├── fixtures/
│   └── test-fixtures.ts
├── pages/
│   └── LoginPage.ts
├── tests/
│   ├── login-valid.spec.ts
│   └── login-invalid.spec.ts
├── utils/
│   └── test-data.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Scope and limitations

The workspace did not include a separate VWO PRD or authorized credentials.
Successful dashboard access, Remember me persistence across authenticated
sessions, MFA, SSO, rate limiting, session security, encryption, and backend
compliance are not verified by this UI suite. UI automation alone cannot prove
those backend or security properties.
