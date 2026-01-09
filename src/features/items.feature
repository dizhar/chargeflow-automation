Feature: Items Page

  Background:
    Given I am logged in
    And I am on the items page

  @smoke
  Scenario: Verify items page is displayed
    Then the items page should be visible
    And I should see the page title "Items"

  @smoke
  Scenario: Verify items list is displayed
    Then the items list should be visible
    And I should see items displayed

  @high
  Scenario: Verify all items are loaded
    Then I should see exactly 5 items
    And all items should have required fields

  @critical
  Scenario: Verify specific item details
    Then I should see item "ITM-1001"
    And item "ITM-1001" should have a title
    And item "ITM-1001" should have an amount
    And item "ITM-1001" should have a status

  @high
  Scenario: Verify item status badges
    Then I should see 4 items with "New" status
    And I should see 1 items with "Reviewed" status

  @critical
  Scenario: Verify first item details
    Then I should see item "ITM-1001"
    And item "ITM-1001" should display "Evidence Request #1001"
    And item "ITM-1001" should display amount "$150.00"
    And item "ITM-1001" should have status "New"

  @medium
  Scenario: Verify reviewed item
    Then I should see item "ITM-1003"
    And item "ITM-1003" should have status "Reviewed"
    And item "ITM-1003" should display amount "$89.99"

  @high
  @debug
  Scenario: Verify navigation from dashboard to items
     
    Given I am on the dashboard page
    When I click on the Items link
    Then I should be on the items page
    And the items list should be visible

  @high
  Scenario: Verify navigation from items to dashboard
    When I click on the Dashboard link
    Then I should be on the dashboard page
    And the dashboard should be visible

  @medium
  Scenario: Verify items page has navigation
    Then I should see the navigation bar
    And I should see the Dashboard link in navigation
    And I should see the Items link in navigation
    And I should see the logout button

  @medium @performance
  Scenario: Items page load time
    Then all items should be loaded
    And the items page should load within acceptable time
    And there should be no loading errors on items page
