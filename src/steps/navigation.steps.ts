import { Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";
import { expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage.js";

When("I click the browser back button", async function (this: CustomWorld) {
  await this.page.goBack();
  await this.page.waitForLoadState("domcontentloaded");
});
