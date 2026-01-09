import { BasePage } from "./BasePage.js";
import { Page } from "@playwright/test";

export class ItemsPage extends BasePage {
  // Selectors
  private readonly itemsTitle = "h1.items-title";
  private readonly itemsList = ".items-list";
  private readonly itemRow = ".item-row";
  private readonly itemId = ".item-id";
  private readonly itemTitle = ".item-title";
  private readonly itemAmount = ".item-amount";
  private readonly statusBadge = ".status-badge";
  private readonly statusNew = ".status-new";
  private readonly statusReviewed = ".status-reviewed";

  constructor(page: Page) {
    super(page);
  }

  private loadingText = this.page.locator("text=Loading items...");

  async waitForItemsToLoad() {
    await this.loadingText.waitFor({
      state: "detached", // or 'hidden' if it stays in DOM
      timeout: 10000,
    });
  }

  async waitForItemsPage(): Promise<void> {
    await this.page.waitForURL("**/items**", { timeout: 10000 });
  }

  async isOnItemsPage(): Promise<boolean> {
    return this.page.url().includes("/items");
  }

  async isItemsPageVisible(): Promise<boolean> {
    return await this.isVisible(this.itemsTitle, 5000);
  }

  async getItemsTitle(): Promise<string> {
    return await this.getText(this.itemsTitle);
  }

  async getItemsCount(): Promise<number> {
    return await this.page.locator(this.itemRow).count();
  }

  async isItemsListVisible(): Promise<boolean> {
    return await this.isVisible(this.itemsList, 5000);
  }

  async getItemById(itemId: string): Promise<boolean> {
    const selector = `${this.itemRow}:has(${this.itemId}:text("${itemId}"))`;
    return await this.isVisible(selector, 5000);
  }

  async getItemDetails(itemId: string): Promise<{
    id: string;
    title: string;
    amount: string;
    status: string;
  } | null> {
    const itemSelector = `${this.itemRow}:has(${this.itemId}:text("${itemId}"))`;
    const isVisible = await this.isVisible(itemSelector, 5000);

    if (!isVisible) return null;

    const id = await this.page
      .locator(itemSelector)
      .locator(this.itemId)
      .textContent();
    const title = await this.page
      .locator(itemSelector)
      .locator(this.itemTitle)
      .textContent();
    const amount = await this.page
      .locator(itemSelector)
      .locator(this.itemAmount)
      .textContent();
    const status = await this.page
      .locator(itemSelector)
      .locator(this.statusBadge)
      .textContent();

    return {
      id: id || "",
      title: title || "",
      amount: amount || "",
      status: status || "",
    };
  }

  async getItemsWithStatus(status: "New" | "Reviewed"): Promise<number> {
    const statusClass = status === "New" ? this.statusNew : this.statusReviewed;
    return await this.page.locator(statusClass).count();
  }

  async areAllItemsDisplayed(): Promise<boolean> {
    const itemsCount = await this.getItemsCount();
    return itemsCount > 0;
  }

  async verifyItemsTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.getItemsTitle();
    return title === expectedTitle;
  }

  async isItemAmountVisible(itemId: string): Promise<boolean> {
    const itemSelector = `${this.itemRow}:has(${this.itemId}:text("${itemId}")) ${this.itemAmount}`;
    return await this.isVisible(itemSelector, 5000);
  }

  async isItemStatusVisible(itemId: string): Promise<boolean> {
    const itemSelector = `${this.itemRow}:has(${this.itemId}:text("${itemId}")) ${this.statusBadge}`;
    return await this.isVisible(itemSelector, 5000);
  }
}
