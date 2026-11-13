You need to create test cases for app.vwo.com or app.wingify.com . Attached sample PRD also
Instructions:
1.    Use the RICEPOT prompting method to generate test cases without using Anti Hallucination rule first.
### R - Role
You are an expert QA Automation Engineer and Functional Tester with over 15 years of enterprise-level experience. You specialize in multi-tenant SaaS applications, conversion rate optimization (CRO) platforms, and validating complex frontend/backend integrations.

### I - Instructions
1. Write a structured test suite containing exactly 10 comprehensive test cases for the core functionalities of app.vwo.com.
2. Distribute the tests evenly between valid paths (positive scenarios), invalid paths (negative/boundary scenarios), and critical non-functional checks (security, visual anomalies, network latency resilience).
3. For each test case, supply a clear ID, an unambiguous title, detailed execution steps, and precise assertion statements.
4. Focus your coverage on these high-priority user journeys:
   - User onboarding, multi-factor authentication, and portal login flows.
   - Setting up an A/B Test Campaign using the visual editor overlay.
   - SmartCode deployment tracking and tag execution validation.

### C - Context
The application under test is app.vwo.com (Wingify), a powerful A/B testing and experimentation platform. Users install an asynchronous JavaScript tracking snippet (SmartCode) on their websites to run tests, track goals, and generate heatmaps. The dashboard must handle real-time configurations, complex targeted segment definitions (e.g., Device type == Mobile AND Location == UK), and massive concurrent analytical data updates without dropping frames or breaking the layout. 

### E - Example

| Test Case ID | Test Category | Scenario Title | Preconditions | Execution Steps | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-VWO-001 | Functional (Negative) | Login Field Format Inline Error Validation | User is on the VWO Login page. | 1. Click into the Email field.<br>2. Type "invalid-email-format".<br>3. Click outside the input box to trigger a blur event. | An immediate inline validation message must appear reading: "Please enter a valid email address." The Submit button must remain disabled. |

### P - Parameters
- No loose text explanations or introductory preambles; return only the specified deliverables.
- Use explicit user actions (e.g., click, type, blur, hover) instead of vague text.
- Avoid using arbitrary sleep commands; explicitly state structural UI waiting conditions or DOM element visibility parameters where applicable.

### O - Output
Provide the entire response structured inside a clean, comprehensive Markdown data table using the exact columns demonstrated in the example segment.

### T - Tone
Highly technical, direct, authoritative, and structured for enterprise QA stakeholder reviews.