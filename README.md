# Test Case Writing

This repository is intended for creating, organizing, and maintaining software test cases.

## Purpose

Use this project to:
- Define clear, repeatable manual test cases
- Track expected vs. actual results
- Improve coverage across features, edge cases, and regressions

## Suggested Test Case Structure

Each test case should include:

1. **Test Case ID**
2. **Title**
3. **Module / Feature**
4. **Preconditions**
5. **Test Data**
6. **Steps to Execute**
7. **Expected Result**
8. **Actual Result**
9. **Status** (Pass/Fail/Blocked)
10. **Notes / Defect Link**

## Example

```text
ID: TC-LOGIN-001
Title: Valid user can log in
Feature: Authentication
Preconditions: User account exists and is active
Test Data: username=user@example.com, password=ValidPass123
Steps:
	1. Open login page
	2. Enter valid username and password
	3. Click "Sign In"
Expected Result: User is redirected to dashboard
Actual Result: [To be filled during execution]
Status: [Pass/Fail/Blocked]
Notes: [Optional]
```

## Best Practices

- Keep steps short, specific, and testable
- Write one validation objective per test case where possible
- Include both positive and negative scenarios
- Reuse common preconditions and data sets
- Keep IDs stable for traceability

## Contribution

When adding or updating test cases:
- Follow the same format
- Use consistent naming and IDs
- Update related cases when requirements change
