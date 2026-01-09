import { expect, Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return this.page.locator(selector).innerText();
  }

  async isVisible(selector: string, timeout = 10000): Promise<boolean> {
    const locator = this.page.locator(selector);
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await locator.isVisible()) {
        return true;
      }
      await this.page.waitForTimeout(100);
    }

    return false;
  }

  async waitForElement(selector: string, timeout = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
