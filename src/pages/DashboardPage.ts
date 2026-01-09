import { BasePage } from "./BasePage.js";
import { Page } from "@playwright/test";

export class DashboardPage extends BasePage {
  // Selectors
  private readonly logoutButton = 'button:has-text("Logout"), a:has-text("Logout")';

  constructor(page: Page) {
    super(page);
  }

  async clickLogout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL("**/dashboard**", { timeout: 10000 });
  }
}
