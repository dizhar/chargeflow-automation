import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";
import { ItemsPage } from "../pages/ItemsPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";

let itemsPage: ItemsPage;

Given("I am on the items page", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);

  // Navigate to items page if not already there
  if (!(await itemsPage.isOnItemsPage())) {
    await this.page.goto(`${this.baseUrl}/items`);
    await itemsPage.waitForItemsPage();
  }

  const isOnItems = await itemsPage.isOnItemsPage();
  expect(isOnItems).toBe(true);

  const isItemsVisible = await itemsPage.isItemsPageVisible();
  expect(isItemsVisible).toBe(true);
});

Then("the items page should be visible", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);

  await itemsPage.waitForItemsPage();

  const isItemsVisible = await itemsPage.isItemsPageVisible();
  expect(isItemsVisible).toBe(true);
});

Then("the items list should be visible", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);

  const isListVisible = await itemsPage.isItemsListVisible();
  expect(isListVisible).toBe(true);
});

Then("I should see items displayed", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);

  const areItemsDisplayed = await itemsPage.areAllItemsDisplayed();
  expect(areItemsDisplayed).toBe(true);
});

Then(
  "I should see exactly {int} items",
  async function (this: CustomWorld, expectedCount: number) {
    itemsPage = new ItemsPage(this.page);
    await itemsPage.waitForItemsToLoad();

    const itemsCount = await itemsPage.getItemsCount();
    expect(itemsCount).toBe(expectedCount);
  }
);

Then(
  "all items should have required fields",
  async function (this: CustomWorld) {
    itemsPage = new ItemsPage(this.page);

    const itemsCount = await itemsPage.getItemsCount();
    expect(itemsCount).toBeGreaterThan(0);

    // Verify first item has all required fields
    const itemDetails = await itemsPage.getItemDetails("ITM-1001");
    expect(itemDetails).not.toBeNull();
    expect(itemDetails?.id).toBeTruthy();
    expect(itemDetails?.title).toBeTruthy();
    expect(itemDetails?.amount).toBeTruthy();
    expect(itemDetails?.status).toBeTruthy();
  }
);

Then(
  "I should see item {string}",
  async function (this: CustomWorld, itemId: string) {
    itemsPage = new ItemsPage(this.page);

    const itemExists = await itemsPage.getItemById(itemId);
    expect(itemExists).toBe(true);
  }
);

Then(
  "item {string} should have a title",
  async function (this: CustomWorld, itemId: string) {
    itemsPage = new ItemsPage(this.page);

    const itemDetails = await itemsPage.getItemDetails(itemId);
    expect(itemDetails).not.toBeNull();
    expect(itemDetails?.title).toBeTruthy();
  }
);

Then(
  "item {string} should have an amount",
  async function (this: CustomWorld, itemId: string) {
    itemsPage = new ItemsPage(this.page);

    const isAmountVisible = await itemsPage.isItemAmountVisible(itemId);
    expect(isAmountVisible).toBe(true);
  }
);

Then(
  "item {string} should have a status",
  async function (this: CustomWorld, itemId: string) {
    itemsPage = new ItemsPage(this.page);

    const isStatusVisible = await itemsPage.isItemStatusVisible(itemId);
    expect(isStatusVisible).toBe(true);
  }
);

Then(
  "I should see {int} items with {string} status",
  async function (this: CustomWorld, expectedCount: number, status: string) {
    itemsPage = new ItemsPage(this.page);

    await itemsPage.waitForItemsToLoad();

    const itemsWithStatus = await itemsPage.getItemsWithStatus(
      status as "New" | "Reviewed"
    );
    expect(itemsWithStatus).toBe(expectedCount);
  }
);

Then(
  "item {string} should display {string}",
  async function (this: CustomWorld, itemId: string, expectedText: string) {
    itemsPage = new ItemsPage(this.page);

    const itemDetails = await itemsPage.getItemDetails(itemId);
    expect(itemDetails).not.toBeNull();
    expect(itemDetails?.title).toContain(expectedText);
  }
);

Then(
  "item {string} should display amount {string}",
  async function (this: CustomWorld, itemId: string, expectedAmount: string) {
    itemsPage = new ItemsPage(this.page);

    const itemDetails = await itemsPage.getItemDetails(itemId);
    expect(itemDetails).not.toBeNull();
    expect(itemDetails?.amount).toBe(expectedAmount);
  }
);

Then(
  "item {string} should have status {string}",
  async function (this: CustomWorld, itemId: string, expectedStatus: string) {
    itemsPage = new ItemsPage(this.page);

    const itemDetails = await itemsPage.getItemDetails(itemId);
    expect(itemDetails).not.toBeNull();
    expect(itemDetails?.status).toBe(expectedStatus);
  }
);

When("I click on the Items link", async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.clickItemsLink();
});

Then("I should be on the items page", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);

  await itemsPage.waitForItemsPage();

  const isOnItems = await itemsPage.isOnItemsPage();
  expect(isOnItems).toBe(true);
});

When("I click on the Dashboard link", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.clickDashboardLink();
});

Then("I should be on the dashboard page", async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);

  await dashboardPage.waitForDashboard();

  const isOnDashboard = await dashboardPage.isOnDashboard();
  expect(isOnDashboard).toBe(true);
});

Then("I should see the navigation bar", async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);

  const isNavVisible = await dashboardPage.isNavLinksVisible();
  expect(isNavVisible).toBe(true);
});

Then(
  "I should see the Dashboard link in navigation",
  async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);

    const isDashboardLinkVisible = await dashboardPage.isDashboardLinkVisible();
    expect(isDashboardLinkVisible).toBe(true);
  }
);

Then(
  "I should see the Items link in navigation",
  async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);

    const isItemsLinkVisible = await dashboardPage.isItemsLinkVisible();
    expect(isItemsLinkVisible).toBe(true);
  }
);

Then("all items should be loaded", async function (this: CustomWorld) {
  itemsPage = new ItemsPage(this.page);

  // ⏳ Wait until "Loading items..." disappears
  await itemsPage.waitForItemsToLoad();

  const areItemsDisplayed = await itemsPage.areAllItemsDisplayed();
  expect(areItemsDisplayed).toBe(true);

  const itemsCount = await itemsPage.getItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

Then(
  "the items page should load within acceptable time",
  async function (this: CustomWorld) {
    // Measure page load time using Performance API
    const loadTime = await this.page.evaluate(() => {
      const perfEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (perfEntry) {
        return perfEntry.loadEventEnd - perfEntry.fetchStart;
      }
      return 0;
    });

    const maxLoadTime = 3000; // 3 seconds

    console.log(`📊 Items page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThanOrEqual(maxLoadTime);
    expect(loadTime).toBeGreaterThan(0);
  }
);

Then(
  "there should be no loading errors on items page",
  async function (this: CustomWorld) {
    const noErrors = await this.page.evaluate(() => {
      const errorElements = document.querySelectorAll(
        '[class*="error"], [class*="Error"], [role="alert"]'
      );
      return errorElements.length === 0;
    });

    expect(noErrors).toBe(true);
  }
);
