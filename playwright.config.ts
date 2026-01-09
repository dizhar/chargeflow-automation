import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  timeout: parseInt(process.env.DEFAULT_TIMEOUT || "30000", 10),
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL:
      process.env.BASE_URL || "https://qa-automation-assignment.chargeflow.io",
    headless: process.env.HEADLESS !== "false",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
});
