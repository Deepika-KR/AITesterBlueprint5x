---
name: "testcase-creator-skill"
description: Generate structured, traceable software test cases (functional, negative, boundary, edge, integration, security, usability, accessibility, performance) from requirements, user stories, acceptance criteria, API specs, UI screens, or feature descriptions. Use this skill whenever the user asks for test cases, test scenarios, a test plan, QA coverage, UAT scripts, or says things like "write tests for this feature", "what should I test", or "how do I test this", even if they don't say "test case" explicitly. Output follows the standard template in assets/test-case-template.md.
---
version: "1.0.0"
author: "Deepika"
license: "MIT"
tags:
  - testcase


# Test case generator
Turn requirements into clear, executable, traceable test cases using one consistent template.

## Core Principles

 1. Understand the input
 2. Derive test conditions
 3. Cover all relevant categories
 4. Write each test case using the template
 5. Review before delivering
 6. Deliver

## Output format selection
- Default: Markdown tables/blocks inside the chat reply for up to ~15 cases.
- More than ~15 cases, or the user mentions Excel/spreadsheet/Jira/TestRail/Zephyr/CSV: create an `.xlsx` or `.csv` file (read the xlsx skill first) with one row per test case and the template's fields as columns, then present the file.
- Gherkin/BDD requested: write `Feature` / `Scenario` / `Given-When-Then`, keeping the same IDs and priorities.
- Automation requested: produce the manual cases first, then code (pytest, Jest, Playwright, Cypress, etc.) mapped to the same IDs.

## Quality bar
- A new tester with no product knowledge could execute any case without asking questions.
- Prefer fewer, sharper cases over padding. Do not generate near-duplicate variations.
- Never invent product behavior. If the expected result is unknown, mark it `TBD – confirm with product owner` and add it to Open Questions.
- Keep tone neutral and professional; avoid filler.

## Example (condensed)

Input: "Login with email and password. Password min 8 chars. Lock account after 5 failed attempts."

Output includes cases such as:
- TC-LOGIN-001: Login with valid credentials (P1, Smoke)
- TC-LOGIN-002: Login with wrong password shows error (P1)
- TC-LOGIN-003: Password of 7 characters rejected (P2, Boundary)
- TC-LOGIN-004: Password of exactly 8 characters accepted (P2, Boundary)
- TC-LOGIN-005: Account locks after 5th consecutive failed attempt (P1)
- TC-LOGIN-006: Correct password rejected while account is locked (P1)
- TC-LOGIN-007: Failed attempt counter resets after successful login (P2)
- TC-LOGIN-008: SQL injection string in email field is rejected safely (P2, Security)
