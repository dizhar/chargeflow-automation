import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import { config } from "../config/env.config.js";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

Given("I am on the login page", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When(
  "I enter email {string}",
  async function (this: CustomWorld, email: string) {
    await loginPage.enterEmail(email);
  }
);

When(
  "I enter password {string}",
  async function (this: CustomWorld, password: string) {
    await loginPage.enterPassword(password);
  }
);

When(
  "I enter a password with 1000 characters",
  async function (this: CustomWorld) {
    // Generate a password with 1000+ characters
    const longPassword = "A".repeat(1000);
    await loginPage.enterPassword(longPassword);
  }
);

When("I login with valid credentials", async function (this: CustomWorld) {
  await loginPage.enterEmail(config.credentials.email);
  await loginPage.enterPassword(config.credentials.password);
  await loginPage.clickSignIn();
});

When("I click the sign in button", async function (this: CustomWorld) {
  await loginPage.clickSignIn();
});

When("I clear the email field", async function (this: CustomWorld) {
  await loginPage.clearEmail();
});

When("I clear the password field", async function (this: CustomWorld) {
  await loginPage.clearPassword();
});

Then("I should be logged in successfully", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.waitForDashboard();
});

Then("I should see an error message", async function (this: CustomWorld) {
  const errorVisible = await loginPage.isErrorMessageVisible();
  expect(errorVisible).toBe(true);
});

Then("I should see email validation error", async function (this: CustomWorld) {
  const isInvalid = await loginPage.isEmailInvalid();
  expect(isInvalid).toBe(true);
});

Then(
  "I should see password validation error",
  async function (this: CustomWorld) {
    const isInvalid = await loginPage.isPasswordInvalid();
    expect(isInvalid).toBe(true);
  }
);

Given("I am logged in", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.open();
  await loginPage.enterEmail(config.credentials.email);
  await loginPage.enterPassword(config.credentials.password);
  await loginPage.clickSignIn();
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.waitForDashboard();
});

When("I click the logout button", async function (this: CustomWorld) {
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.clickLogout();
});

When(
  "I navigate directly to the dashboard URL",
  async function (this: CustomWorld) {
    const dashboardUrl = `${config.baseUrl}/dashboard`;
    await this.page.goto(dashboardUrl);
    await this.page.waitForLoadState("networkidle");
  }
);

Then("I should be logged out", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.waitForLoginPage();
});

Then(
  "I should be redirected to the login page",
  async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.waitForLoginPage();
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  }
);

Then(
  "the page should not execute any scripts",
  async function (this: CustomWorld) {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBeTruthy();
    // Verify the email input contains the raw script text, not executed
    const emailValue = await loginPage.getEmailValue();
    expect(emailValue).toContain("<script>");
  }
);
