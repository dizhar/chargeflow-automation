import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { launchBrowser, createContext, createPage } from "./browser.js";
import dotenv from "dotenv";

dotenv.config();

export interface CustomWorldOptions extends IWorldOptions {
  parameters: {
    baseUrl?: string;
  };
}

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  baseUrl: string;

  constructor(options: CustomWorldOptions) {
    super(options);
    this.baseUrl =
      process.env.BASE_URL || "https://qa-automation-assignment.chargeflow.io";
  }

  async init(): Promise<void> {
    this.browser = await launchBrowser();
    this.context = await createContext(this.browser);
    this.page = await createPage(this.context);
  }

  async cleanup(): Promise<void> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
