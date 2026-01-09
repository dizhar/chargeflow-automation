Feature: Dashboard

  Background:
    Given I am logged in
    And I am on the dashboard page

  @smoke
  Scenario: Verify dashboard page is displayed
    Then the dashboard should be visible
    And I should see the dashboard nav links
    And I should see the logout button

  @smoke
  Scenario: Verify logout functionality
    When I click logout
    Then I should be redirected away from the dashboard

  Scenario: Verify dashboard elements are visible
    Then the dashboard should be visible
    And I should see the logout button

  @security
  Scenario: Session persistence after page refresh
    When I refresh the page
    Then the dashboard should be visible
    And I should see the logout button

  @security
  Scenario: Multiple logout clicks
    When I click logout
    Then I should be redirected away from the dashboard

  Scenario: Dashboard accessibility after successful login
    Then the dashboard should be visible
    And I should see the logout button

  @critical
  Scenario: Logout and verify session is cleared
    When I click logout
    Then I should be redirected away from the dashboard
    When I click the browser back button
    Then I should be redirected away from the dashboard

  @high
  Scenario: Verify Dashboard Title Display
    Then I should see the dashboard title "Dashboard"
    And the dashboard title should be visible and styled properly

  @high
  Scenario: Verify Welcome Message Display
    Then I should see a welcome message for "qa@chargeflow.com"
    And the welcome message should be displayed correctly

  @high
  Scenario: Verify Dashboard Cards Container
    Then the dashboard cards container should be visible
    And I should see exactly 2 dashboard cards
    And the cards should be properly arranged

  @critical
  Scenario: Verify "Open Items" Card Display
    Then I should see the "Open Items" card
    And the "Open Items" card should have a title
    And the "Open Items" card should display a count
    And the "Open Items" card should be properly styled

  @medium @performance
  Scenario: Dashboard Page Load Time
    Then all dashboard elements should be loaded
    And the dashboard should load within acceptable time
    And dashboard counts should be visible
    And there should be no loading errors
