import { BasePage } from "./BasePage.js";
import { Page } from "@playwright/test";

export class DashboardPage extends BasePage {
  // Selectors
  private readonly logoutButton = 'button:has-text("Logout")';
  private readonly dashboardTitle = "h1.dashboard-title";
  private readonly welcomeMessage = "p.welcome-message";
  private readonly dashboardCards = ".dashboard-cards";
  private readonly navLinks = "nav .nav-links";
  private readonly dashboardLink = 'a[href="/dashboard"]';
  private readonly itemsLink = 'a[href="/items"]';

  constructor(page: Page) {
    super(page);
  }

  async clickLogout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL("**/dashboard**", { timeout: 10000 });
  }

  async isOnDashboard(): Promise<boolean> {
    return this.page.url().includes("/dashboard");
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardTitle, 5000);
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.logoutButton, 5000);
  }

  async getDashboardUrl(): Promise<string> {
    return this.page.url();
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  async waitForDashboardLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async getDashboardTitle(): Promise<string> {
    return await this.getText(this.dashboardTitle);
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }

  async isNavLinksVisible(): Promise<boolean> {
    return await this.isVisible(this.navLinks, 5000);
  }

  async isDashboardLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardLink, 5000);
  }

  async isItemsLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.itemsLink, 5000);
  }

  async areCardsVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardCards, 5000);
  }

  async getCardCount(cardTitle: string): Promise<string> {
    const cardSelector = `.dashboard-card:has(.card-title:text("${cardTitle}")) .card-count`;
    return await this.getText(cardSelector);
  }

  async clickItemsLink(): Promise<void> {
    await this.click(this.itemsLink);
  }

  async clickDashboardLink(): Promise<void> {
    await this.click(this.dashboardLink);
  }

  async verifyDashboardTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.getText(this.dashboardTitle);
    return title === expectedTitle;
  }

  async verifyWelcomeMessageContains(email: string): Promise<boolean> {
    const message = await this.getText(this.welcomeMessage);
    return message.includes(email);
  }

  async isCardVisible(cardTitle: string): Promise<boolean> {
    const cardSelector = `.dashboard-card .card-title:has-text("${cardTitle}")`;
    return await this.isVisible(cardSelector, 5000);
  }

  async verifyCardCount(cardTitle: string, expectedCount: number): Promise<boolean> {
    try {
      const count = await this.getCardCount(cardTitle);
      return parseInt(count) === expectedCount;
    } catch {
      return false;
    }
  }

  async isRedirectedAwayFromDashboard(): Promise<boolean> {
    return !(await this.isOnDashboard());
  }

  async getDashboardCardsCount(): Promise<number> {
    const cards = await this.page.locator(".dashboard-card").count();
    return cards;
  }

  async isCardsContainerVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardCards, 5000);
  }

  async isCardTitleVisible(cardTitle: string): Promise<boolean> {
    const cardTitleSelector = `.dashboard-card .card-title:has-text("${cardTitle}")`;
    return await this.isVisible(cardTitleSelector, 5000);
  }

  async isCardCountVisible(cardTitle: string): Promise<boolean> {
    const cardCountSelector = `.dashboard-card:has(.card-title:text("${cardTitle}")) .card-count`;
    return await this.isVisible(cardCountSelector, 5000);
  }

  async hasCardProperStructure(cardTitle: string): Promise<boolean> {
    const isCardVisible = await this.isCardVisible(cardTitle);
    const isTitleVisible = await this.isCardTitleVisible(cardTitle);
    const isCountVisible = await this.isCardCountVisible(cardTitle);
    return isCardVisible && isTitleVisible && isCountVisible;
  }

  async areAllDashboardElementsLoaded(): Promise<boolean> {
    const isDashboardVisible = await this.isDashboardVisible();
    const areCardsVisible = await this.areCardsVisible();
    const isLogoutButtonVisible = await this.isLogoutButtonVisible();
    const isNavLinksVisible = await this.isNavLinksVisible();
    return (
      isDashboardVisible &&
      areCardsVisible &&
      isLogoutButtonVisible &&
      isNavLinksVisible
    );
  }

  async measurePageLoadTime(): Promise<number> {
    const loadTime = await this.page.evaluate(() => {
      const perfEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (perfEntry) {
        return perfEntry.loadEventEnd - perfEntry.fetchStart;
      }
      return 0;
    });
    return loadTime;
  }

  async isPageLoadedWithinTime(maxTimeMs: number): Promise<boolean> {
    try {
      const loadTime = await this.measurePageLoadTime();
      return loadTime <= maxTimeMs && loadTime > 0;
    } catch {
      return false;
    }
  }

  async areCardCountsVisible(): Promise<boolean> {
    const cards = await this.page.locator(".dashboard-card .card-count").count();
    if (cards === 0) return false;

    for (let i = 0; i < cards; i++) {
      const isVisible = await this.page
        .locator(".dashboard-card .card-count")
        .nth(i)
        .isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  async checkForLoadingErrors(): Promise<boolean> {
    const errors = await this.page.evaluate(() => {
      const errorElements = document.querySelectorAll(
        '[class*="error"], [class*="Error"], [role="alert"]'
      );
      return errorElements.length === 0;
    });
    return errors;
  }
}
