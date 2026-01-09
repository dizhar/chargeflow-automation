import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl:
    process.env.BASE_URL || "https://qa-automation-assignment.chargeflow.io",
  headless: process.env.HEADLESS !== "false",
  browser: process.env.BROWSER || "chromium",
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || "30000", 10),
  viewport: {
    width: 1280,
    height: 720,
  },
  credentials: {
    email: process.env.EMAIL || "",
    password: process.env.PASSWORD || "",
  },
  env: process.env.ENV || "staging",
};
