import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

// Define the tests to be ignored. This will skip out the products that are not in test
const products = ['bingo', 'casino', 'vegas'];
products.splice(products.indexOf(process.env.PRODUCT || '', 0), 1);
const testIgnore = new RegExp(`tests/${products.join('|tests/')}`);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    testIgnore,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    workers: 20,
    // workers: process.env.CI ? 2 : 10,
    // workers: 5,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['list', { printSteps: true }],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'playwright-report/results.json' }],
        ['./src/reporter.ts', { outputFile: './test-results/testrail.{suite}.xml' }],
        ['junit', { embedAnnotationsAsProperties: true, outputFile: './test-results/junit-report.xml' }],
        ['allure-playwright'],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        screenshot: {
            mode: 'on',
            fullPage: true,
        },
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
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

    // Extended timeouts
    // This is due to the amount of time that it takes for the portals to fully load and populate with content
    timeout: 60000,
    expect: { timeout: 10000 },
});
