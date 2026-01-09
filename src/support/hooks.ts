import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { CustomWorld } from "./world.js";
import fs from "fs";
import path from "path";

setDefaultTimeout(60000);

BeforeAll(async function () {
  console.log("🚀 Starting test suite...");

  // Create directories for screenshots and allure results
  const screenshotsDir = "reports/screenshots";
  const allureResultsDir = "allure-results";

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }
});

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
    const screenshotPath = path.join(
      "reports/screenshots",
      `${scenarioName}_${timestamp}.png`
    );

    // Take screenshot as buffer for Allure
    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    // Attach screenshot to Allure report with proper mime type
    this.attach(screenshot, "image/png");

    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  }

  // Always close the page after scenario
  await this.cleanup();
});

AfterAll(async function () {
  console.log("✅ Test suite completed.");
});
