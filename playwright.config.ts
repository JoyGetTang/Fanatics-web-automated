import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "..", "my.env") });

export default defineConfig({
  /*Change testcases path */
  testDir: "./tests/liveOS",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  outputDir: "test-results",
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["junit", { outputFile: "results.xml" }],
    ["html", { outputFolder: "playwright-report" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // maxFailures: 1,
  timeout: 3 * 60 * 60 * 1000,
  use: {
    // headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    video: { mode: "retain-on-failure", size: { width: 1920, height: 1280 } },
    screenshot: "on",
    actionTimeout: 10 * 1000,
    navigationTimeout: 60 * 1000,
    permissions: ["camera", "microphone"],
  },

  /* Configure projects for major browsers */
  projects: [
    // { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "teardown",
      testMatch: /.*\.teardown\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1280 },
        storageState: ".auth/user.json",
        launchOptions: {
          args: [
            "--disable-web-security",
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
            "--no-sandbox",
            "--start-maximized",
          ],
        },
      },
    },
    {
      name: "chromium",
      teardown: "teardown",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1280 },
        storageState: ".auth/user.json",
        launchOptions: {
          args: [
            "--disable-web-security",
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
            "--no-sandbox",
            "--start-maximized",
          ],
        },
      },
      // dependencies: ["setup"],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
