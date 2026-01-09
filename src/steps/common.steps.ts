import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";

Then(
  "I should see the page title {string}",
  async function (this: CustomWorld, expectedTitle: string) {
    await expect(this.page.locator("h1")).toHaveText(expectedTitle);
  }
);

Then(
  "I should see the subtitle {string}",
  async function (this: CustomWorld, expectedSubtitle: string) {
    await expect(
      this.page.getByText(expectedSubtitle, { exact: true })
    ).toBeVisible();
  }
);
