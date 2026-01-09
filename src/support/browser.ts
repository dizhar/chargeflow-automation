import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { config } from "../config/env.config.js";

export async function launchBrowser(): Promise<Browser> {
  const options = { headless: config.headless };

  switch (config.browser) {
    case "firefox":
      return firefox.launch(options);
    case "webkit":
      return webkit.launch(options);
    default:
      return chromium.launch(options);
  }
}

export async function createContext(browser: Browser): Promise<BrowserContext> {
  return browser.newContext({
    viewport: config.viewport,
    ignoreHTTPSErrors: true,
  });
}

export async function createPage(context: BrowserContext): Promise<Page> {
  const page = await context.newPage();
  page.setDefaultTimeout(config.defaultTimeout);
  return page;
}
