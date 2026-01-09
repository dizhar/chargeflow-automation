Feature: Login

  Background:
    Given I am on the login page

  Scenario: Verify login page is displayed
    Then I should see the page title "Chargeflow QA Challenge"
    And I should see the subtitle "Sign in to continue"

  @smoke
  Scenario: Login with valid credentials
    When I login with valid credentials
    Then I should be logged in successfully

  Scenario: Login with invalid credentials
    When I enter email "invalid@email.com"
    And I enter password "wrongpassword"
    And I click the sign in button
    Then I should see an error message

  Scenario: Login with empty email
    When I clear the email field
    And I enter password "Password123!"
    And I click the sign in button
    Then I should see email validation error

  Scenario: Login with empty password
    When I enter email "qa@chargeflow.com"
    And I clear the password field
    And I click the sign in button
    Then I should see password validation error

  Scenario: Login with both fields empty
    When I clear the email field
    And I clear the password field
    And I click the sign in button
    Then I should see email validation error
    And I should see password validation error

  @critical @security
  Scenario: Login with SQL injection
    When I enter email "qa@chargeflow.com' OR '1'='1"
    And I enter password "Password123!"
    And I click the sign in button
    Then I should see email validation error

  @critical @security
  Scenario: Login with XSS attack
    When I enter email "<script>alert('XSS')</script>@test.com"
    And I enter password "Password123!"
    And I click the sign in button
    Then I should see email validation error
    And the page should not execute any scripts

  Scenario: Login with excessive password length
    When I enter email "qa@chargeflow.com"
    And I enter a password with 1000 characters
    And I click the sign in button
    Then I should see an error message

  Scenario: Login with special characters in email
    When I enter email "test!#$%@example.com"
    And I enter password "Password123!"
    And I click the sign in button
    Then I should see an error message

  Scenario: login when email contains leading and trailing spaces
    When I enter email " qa@chargeflow.com "
    And I enter password "Password123!"
    And I click the sign in button
    Then I should be logged in successfully

  Scenario: Case sensitivity check for email
    When I enter email "QA@CHARGEFLOW.COM"
    And I enter password "Password123!"
    And I click the sign in button
    Then I should see an error message

  Scenario: Case sensitivity check for password
    When I enter email "qa@chargeflow.com"
    And I enter password "password123!"
    And I click the sign in button
    Then I should see an error message

  @critical @security
  Scenario: Direct URL access without authentication
    When I navigate directly to the dashboard URL
    Then I should be redirected to the login page

  @critical
  Scenario: Successful logout
    Given I am logged in
    When I click the logout button
    Then I should be logged out
    And I should be redirected to the login page

  @critical @security
  Scenario: Browser back button after logout
    Given I am logged in
    When I click the logout button
    Then I should be logged out
    And I click the browser back button
    Then I should be redirected to the login page
