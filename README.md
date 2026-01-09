# Chargeflow Automation

A BDD (Behavior-Driven Development) test automation framework for the Chargeflow QA assignment, built with Cucumber.js, Playwright, and TypeScript.

## Features

- BDD testing with Cucumber and Gherkin syntax
- Browser automation using Playwright
- Page Object Model (POM) design pattern
- TypeScript for type safety
- Multiple reporting options (HTML, JSON, Allure)
- Comprehensive login flow testing including security scenarios
- Environment-based configuration

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy [.env.example](.env.example) to `.env`
   - Update the values as needed

## Configuration

Configuration is managed through environment variables in the [.env](.env) file:

- `BASE_URL`: Application URL
- `BROWSER`: Browser to use (chromium, firefox, webkit)
- `HEADLESS`: Run browser in headless mode (true/false)
- `DEFAULT_TIMEOUT`: Default timeout in milliseconds
- `EMAIL`: Test user email
- `PASSWORD`: Test user password
- `ENV`: Environment name

## Running Tests

### Run tests with Allure reporting

```bash
npm run test:allure
```

## Reporting

### HTML Report

After running tests, view the HTML report:

```bash
npm run report
```

The report is generated at [reports/cucumber-report.html](reports/cucumber-report.html)

### Allure Report

For detailed Allure reports with advanced analytics:

```bash
npm run allure:convert    # Convert Cucumber JSON to Allure format
npm run allure:generate   # Generate Allure report
npm run allure:open       # Open the report in browser
npm run allure:serve      # Serve the report
```

See [ALLURE_REPORTING.md](ALLURE_REPORTING.md) for detailed Allure reporting documentation.

## Project Structure

```
chargeflow-automation/
├── src/
│   ├── config/           # Configuration files
│   │   └── env.config.ts
│   ├── features/         # Cucumber feature files
│   │   └── login.feature
│   ├── pages/            # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── DashboardPage.ts
│   ├── steps/            # Step definitions
│   │   └── login.steps.ts
│   └── support/          # Support files
│       ├── browser.ts
│       ├── hooks.ts
│       └── world.ts
├── scripts/              # Utility scripts
│   └── cucumber-to-allure.js
├── reports/              # Test reports
├── allure-results/       # Allure test results
├── allure-report/        # Generated Allure reports
├── cucumber.cjs          # Cucumber configuration
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Example environment variables
└── package.json          # Project dependencies and scripts
```

## Test Scenarios

The framework includes comprehensive test coverage for the login functionality:

- Basic login flow validation
- Authentication with valid/invalid credentials
- Field validation (empty fields, format validation)
- Security testing (SQL injection, XSS attacks)
- Edge cases (special characters, case sensitivity, spaces)
- Session management (logout, browser back button)
- Direct URL access protection

## Tags

Tests can be filtered using tags:

- `@smoke`: Smoke tests
- `@critical`: Critical functionality
- `@security`: Security-related tests

## License

ISC
