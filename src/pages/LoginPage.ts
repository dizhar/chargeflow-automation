import { BasePage } from "./BasePage.js";
import { Page } from "@playwright/test";
import { config } from "../config/env.config.js";

export class LoginPage extends BasePage {
  // URL
  private readonly url = `${config.baseUrl}/login`;

  // Selectors
  private readonly emailInput = "#email";
  private readonly passwordInput = "#password";
  private readonly signInButton = 'button[type="submit"]';
  private readonly pageTitle = ".login-title";
  private readonly pageSubtitle = ".login-subtitle";
  private readonly errorMessage = '.error-message, [role="alert"]';

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate(this.url);
    await this.waitForPageLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async enterEmail(email: string): Promise<void> {
    await this.page.locator(this.emailInput).clear();
    await this.fill(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.locator(this.passwordInput).clear();
    await this.fill(this.passwordInput, password);
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async getPageSubtitle(): Promise<string> {
    return this.getText(this.pageSubtitle);
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return this.isVisible(this.emailInput);
  }

  async getEmailValue(): Promise<string> {
    return this.page.locator(this.emailInput).inputValue();
  }

  async getPasswordValue(): Promise<string> {
    return this.page.locator(this.passwordInput).inputValue();
  }

  async waitForLoginPage(): Promise<void> {
    await this.page.waitForURL("**/login**", { timeout: 10000 });
  }

  async isOnLoginPage(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes("/login");
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  async isEmailInvalid(): Promise<boolean> {
    return this.page
      .locator(this.emailInput)
      .evaluate((el: HTMLInputElement) => !el.validity.valid);
  }

  async isPasswordInvalid(): Promise<boolean> {
    return this.page
      .locator(this.passwordInput)
      .evaluate((el: HTMLInputElement) => !el.validity.valid);
  }

  async getEmailValidationMessage(): Promise<string> {
    return this.page
      .locator(this.emailInput)
      .evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async getPasswordValidationMessage(): Promise<string> {
    return this.page
      .locator(this.passwordInput)
      .evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async clearEmail(): Promise<void> {
    await this.page.locator(this.emailInput).clear();
  }

  async clearPassword(): Promise<void> {
    await this.page.locator(this.passwordInput).clear();
  }
}
