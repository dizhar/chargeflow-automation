# Allure Reporting

This project uses a custom Cucumber JSON to Allure converter to generate Allure reports.

## How It Works

1. Tests run and generate a Cucumber JSON report at `reports/cucumber-report.json`
2. A Node.js script (`scripts/cucumber-to-allure.js`) converts the JSON to Allure format
3. Allure results are stored in `allure-results/`
4. Allure CLI generates and serves the report

## Commands

### Run tests and view Allure report

```bash
npm run test:allure
```

This will:

- Run all tests
- Convert Cucumber JSON to Allure format
- Generate and open the Allure report in your browser

### Run individual steps

1. **Run tests only:**

   ```bash
   npm test
   ```

2. **Convert results to Allure format:**

   ```bash
   npm run allure:convert
   ```

3. **Generate Allure report:**

   ```bash
   npm run allure:generate
   ```

4. **Serve Allure report:**

   ```bash
   npm run allure:serve
   ```

5. **Open existing Allure report:**
   ```bash
   npm run allure:open
   ```

## Test Count

The Allure report will show all **8 test scenarios**:

1. Verify login page is displayed
2. Login with valid credentials
3. Login with invalid credentials
4. Login with empty email
5. Login with empty password
6. Login with both fields empty
7. Login with SQL injection
8. Successful logout
