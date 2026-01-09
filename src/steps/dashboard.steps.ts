import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";
import { DashboardPage } from "../pages/DashboardPage.js";

let dashboardPage: DashboardPage;

Given("I am on the dashboard page", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);

  // If we’re not already on /dashboard, go there.
  if (!this.page.url().includes("/dashboard")) {
    await this.page.goto(`${this.baseUrl}/dashboard`, {
      waitUntil: "domcontentloaded",
    });
  }

  await dashboardPage.waitForDashboard();
  await dashboardPage.waitForDashboardLoad();

  await expect(this.page).toHaveURL(/\/dashboard(\b|\/|\?)/);

  const isDashboardTitleCorrect = await dashboardPage.verifyDashboardTitle(
    "Dashboard"
  );
  expect(isDashboardTitleCorrect).toBe(true);

  const isNavLinksVisible = await dashboardPage.isNavLinksVisible();
  expect(isNavLinksVisible).toBe(true);
});

Then("the dashboard should be visible", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);

  await dashboardPage.waitForDashboard();

  const isDashboardVisible = await dashboardPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true);

  const areCardsVisible = await dashboardPage.areCardsVisible();
  expect(areCardsVisible).toBe(true);
});

Then("I should see the logout button", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);

  const isLogoutButtonVisible = await dashboardPage.isLogoutButtonVisible();
  expect(isLogoutButtonVisible).toBe(true);
});

Then(
  "I should see a welcome message for {string}",
  async function (this: CustomWorld, email: string) {
    dashboardPage = new DashboardPage(this.page);

    const welcomeMessageContainsEmail =
      await dashboardPage.verifyWelcomeMessageContains(email);
    expect(welcomeMessageContainsEmail).toBe(true);
  }
);

Then(
  'I should see the "{string}" card with count {int}',
  async function (this: CustomWorld, cardTitle: string, count: number) {
    dashboardPage = new DashboardPage(this.page);

    const isCardVisible = await dashboardPage.isCardVisible(cardTitle);
    expect(isCardVisible).toBe(true);

    const isCardCountCorrect = await dashboardPage.verifyCardCount(
      cardTitle,
      count
    );
    expect(isCardCountCorrect).toBe(true);
  }
);

Then(
  "I should see the dashboard nav links",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const isNavLinksVisible = await dashboardPage.isNavLinksVisible();
    expect(isNavLinksVisible).toBe(true);

    const isDashboardLinkVisible = await dashboardPage.isDashboardLinkVisible();
    expect(isDashboardLinkVisible).toBe(true);

    const isItemsLinkVisible = await dashboardPage.isItemsLinkVisible();
    expect(isItemsLinkVisible).toBe(true);
  }
);

When("I click logout", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.clickLogout();
});

Then(
  "I should be redirected away from the dashboard",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);
    // Wait until URL is NOT dashboard anymore
    await this.page.waitForURL((url) => !url.pathname.includes("/dashboard"), {
      timeout: 10000,
    });
    const isRedirectedAway =
      await dashboardPage.isRedirectedAwayFromDashboard();
    expect(isRedirectedAway).toBe(true);
  }
);

When("I refresh the page", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.refreshPage();
});

Then(
  "I should see the dashboard title {string}",
  async function (this: CustomWorld, expectedTitle: string) {
    dashboardPage = new DashboardPage(this.page);

    const isDashboardTitleCorrect = await dashboardPage.verifyDashboardTitle(
      expectedTitle
    );
    expect(isDashboardTitleCorrect).toBe(true);

    const dashboardTitle = await dashboardPage.getDashboardTitle();
    expect(dashboardTitle).toBe(expectedTitle);
  }
);

Then(
  "the dashboard title should be visible and styled properly",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
  }
);

Then(
  "the welcome message should be displayed correctly",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const welcomeMessage = await dashboardPage.getWelcomeMessage();
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage).toContain("Welcome");
    expect(welcomeMessage).toContain("qa@chargeflow.com");
  }
);

Then(
  "the dashboard cards container should be visible",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const isCardsContainerVisible =
      await dashboardPage.isCardsContainerVisible();
    expect(isCardsContainerVisible).toBe(true);
  }
);

Then(
  "I should see exactly {int} dashboard cards",
  async function (this: CustomWorld, expectedCount: number) {
    dashboardPage = new DashboardPage(this.page);

    const cardsCount = await dashboardPage.getDashboardCardsCount();
    expect(cardsCount).toBe(expectedCount);
  }
);

Then(
  "the cards should be properly arranged",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const areCardsVisible = await dashboardPage.areCardsVisible();
    expect(areCardsVisible).toBe(true);

    const cardsCount = await dashboardPage.getDashboardCardsCount();
    expect(cardsCount).toBeGreaterThan(0);
  }
);

Then(
  /^I should see the "([^"]*)" card$/,
  async function (this: CustomWorld, cardTitle: string) {
    dashboardPage = new DashboardPage(this.page);

    const isCardVisible = await dashboardPage.isCardVisible(cardTitle);
    expect(isCardVisible).toBe(true);
  }
);

Then(
  /^the "([^"]*)" card should have a title$/,
  async function (this: CustomWorld, cardTitle: string) {
    dashboardPage = new DashboardPage(this.page);

    const isCardTitleVisible = await dashboardPage.isCardTitleVisible(
      cardTitle
    );
    expect(isCardTitleVisible).toBe(true);
  }
);

Then(
  /^the "([^"]*)" card should display a count$/,
  async function (this: CustomWorld, cardTitle: string) {
    dashboardPage = new DashboardPage(this.page);

    const isCardCountVisible = await dashboardPage.isCardCountVisible(
      cardTitle
    );
    expect(isCardCountVisible).toBe(true);
  }
);

Then(
  /^the "([^"]*)" card should be properly styled$/,
  async function (this: CustomWorld, cardTitle: string) {
    dashboardPage = new DashboardPage(this.page);

    const isCardVisible = await dashboardPage.isCardVisible(cardTitle);
    expect(isCardVisible).toBe(true);

    const isCardTitleVisible = await dashboardPage.isCardTitleVisible(
      cardTitle
    );
    expect(isCardTitleVisible).toBe(true);

    const isCardCountVisible = await dashboardPage.isCardCountVisible(
      cardTitle
    );
    expect(isCardCountVisible).toBe(true);
  }
);

Then(
  "all dashboard elements should be loaded",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const areAllElementsLoaded =
      await dashboardPage.areAllDashboardElementsLoaded();
    expect(areAllElementsLoaded).toBe(true);
  }
);

Then(
  "the dashboard should load within acceptable time",
  async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);

    const loadTime = await dashboardPage.measurePageLoadTime();
    const maxLoadTime = 3000; // 3 seconds

    console.log(`📊 Dashboard load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThanOrEqual(maxLoadTime);
    expect(loadTime).toBeGreaterThan(0);
  }
);

Then("dashboard counts should be visible", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);

  const areCountsVisible = await dashboardPage.areCardCountsVisible();
  expect(areCountsVisible).toBe(true);
});

Then("there should be no loading errors", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);

  const noErrors = await dashboardPage.checkForLoadingErrors();
  expect(noErrors).toBe(true);
});
