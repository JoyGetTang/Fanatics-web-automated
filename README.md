# playwright_auto

install VScode

Install 'Playwright Test for VSCode' from the marketplace or from the extensions tab in VS Code.

Once installed, open the command panel and type:

Install Playwright

Select Test: Install Playwright and Choose the browsers you would like to run your tests on.

You can run a single test by clicking the green triangle next to your test block to run your test. Playwright will run through each line of the test and when it finishes you will see a green tick next to your test block as well as the time it took to run the test.

if have any problem , click url to check steps.

https://playwright.dev/docs/getting-started-vscode

download repo

once downloaded , open the repo and xocde terminal , run npm install

run :npx playwright test

all web elements in path: common/pages/.. , add locators in different pages, ex: Go live button's xpath should add in livePage

all web actions in path: common/steps/.. , add actions in different pages, ex: Click sign up should add in loginPage

all api in path: common/api/.., add it in index.ts

all test in path: tests/.., if you want add tests for LiveOSv2 , write your test in v2 folder

name your test file : xxx.spec.ts

basic code form:

import { test } from "@fixtures";
import Steps from "@/steps";

test.describe("describe your testcases", () => {
test("your testcases name", async ({ page }) => {
const steps = new Steps(page);
...your test code
});
});

after you finished your test , you can run a single test by clicking the green triangle next to your test block to run your test or run cmd: npx playwright test xxx.spec.ts(your test file)

debug : npx playwright test xxx.spec.ts(your test file) --debug

The HTML Reporter shows you a full report of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests. By default, the HTML report is opened automatically if some of the tests failed, otherwise you can open it with the following command.

: npx playwright show-report

You can filter and search for tests as well as click on each test to see the tests errors and explore each step of the test.

!! default use headless mode. you can change it in playwiright.config.ts line 25

!! default test folder is "./tests/v2", change it as you want in playwiright.config.ts testDir: "./tests/v2"

!! rm -r /var/folders/04/xmfg8f0n1lx9ffzbstbfx5dh0000gn/T/playwright-transform-cache-501 ;if can't find file path

npx playwright codegen --viewport-size=1920,950

https://trace.playwright.dev/ ## Drop Playwright Trace to load
