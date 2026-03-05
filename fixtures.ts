import { test as base, expect } from "@playwright/test";
export const test = base.extend<{ afterEach: void }>({
  afterEach: [
    async ({ page }, use) => {
      await use();
      await page.close();
    },
    { auto: true },
  ],
});

export const afterEach = (Steps: any, liveStreams: string[]) =>
  test.afterEach("endlive", async ({ browser }) => {
    const authFile = ".auth/user.json";
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    const steps = new Steps(page);
    await steps.page.goto(
      "https://os.dev.fanatics.live/shops/fanatics-live/manage"
    );
    // await steps.loginSteps.clickShop();
    // await steps.page.goto(
    //   "https://os.dev.fanatics.live/shops/fanatics-live/manage"
    // );
    // await steps.homeSteps.goShows();
    for (const liveStream of liveStreams) {
      try {
        await steps.homeSteps.searchAndEnterShow(liveStream);
        await steps.liveStepsV2.defaultCameraSet();
        await steps.liveStepsV2.takeControl();
        await steps.liveStepsV2.endShowButton.click({ timeout: 5000 });
        await steps.liveStepsV2.imSure.check();
        expect(await steps.liveStepsV2.imSure.isChecked()).toBeTruthy();
        await steps.liveStepsV2.endStreamButton.click();
      } catch (error) {}
      await steps.homeSteps.goHome();
    }
    await page.close();
  });

// export const afterAll = (Steps: any, liveStreams: string[]) =>
//   test.afterAll("endAllLive", async ({ browser }) => {
//     const authFile = ".auth/user.json";
//     const context = await browser.newContext({ storageState: authFile });
//     const page = await context.newPage();
//     const steps = new Steps(page);
//     await steps.page.goto(
//       "https://os.dev.fanatics.live/shops/test-shop/manage/live_streams"
//     );
//     //os.dev.fanatics.live/shops/fanatics-live/manage
//     https: await steps.loginSteps.clickShop();
//     await steps.page.goto(
//       "https://os.dev.fanatics.live/shops/test-shop/manage/live_streams"
//     );
//     await expect(steps.homeSteps.shows).toBeInViewport({ timeout: 10000 });
//     for (const liveStream of liveStreams) {
//       try {
//         await expect(steps.page.getByText(liveStream)).toBeInViewport({
//           timeout: 1000,
//         });
//         await steps.showsSteps.enterShow(liveStream);
//         await steps.liveStepsV2.takeControl();
//         await steps.liveStepsV2.endShowButton.click({ timeout: 10000 });
//         await steps.liveStepsV2.imSure.check();
//         expect(await steps.liveStepsV2.imSure.isChecked()).toBeTruthy();
//         await steps.liveStepsV2.endStreamButton.click();
//         await steps.liveStepsV2.page.waitForTimeout(3000);
//         await steps.homeSteps.goShows();
//       } catch (error) {}
//     }
//     await page.close();
//   });

export const afterAll = (Steps: any, liveStreams: string[]) =>
  test.afterAll("endAllLive", async ({ browser }) => {
    const authFile = ".auth/user.json";
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    const steps = new Steps(page);
    await steps.page.goto(
      "https://os.dev.fanatics.live/shops/fanatics-live/manage"
    );
    // await steps.loginSteps.clickShop();
    // await steps.page.goto(
    //   "https://os.dev.fanatics.live/shops/fanatics-live/manage"
    // );
    // await steps.homeSteps.goShows();
    for (const liveStream of liveStreams) {
      try {
        await steps.homeSteps.searchAndEnterShow(liveStream);
        await steps.liveStepsV2.takeControl();
        await steps.liveStepsV2.endShowButton.click({ timeout: 10000 });
        await steps.liveStepsV2.imSure.check();
        expect(await steps.liveStepsV2.imSure.isChecked()).toBeTruthy();
        await steps.liveStepsV2.endStreamButton.click();
        await steps.liveStepsV2.page.waitForTimeout(3000);
        await steps.homeSteps.goHome();
      } catch (error) {}
    }
    await page.close();
  });
