import { expect, test as teardown } from "@playwright/test";
import Steps from "@/steps/liveOS";
import { loginParams } from "@/params/loginParams";

const authFile = ".auth/user.json";
teardown.use({ storageState: authFile });

teardown("End rest lives", async ({ page }) => {
  const steps = new Steps(page);
  await steps.loginSteps.goTo(loginParams.manageUrl);
  await steps.page.goto(
    "https://os.dev.fanatics.live/shops/test-shop/manage/live_streams",
  );
  await expect(steps.homeSteps.shows).toBeInViewport({ timeout: 10000 });
  while (true) {
    try {
      await steps.page
        .locator("div > footer ")
        .filter({ hasText: "Live" })
        .getByRole("link")
        .first()
        .click({ timeout: 3000 });
      try {
        await steps.liveStepsV2.defaultCameraSet();
        await steps.liveStepsV2.takeControl();
      } catch (error) {}
      try {
        await steps.liveStepsV2.endShowButton.click({ timeout: 10000 });
      } catch (error) {
        continue;
      }
      await steps.liveStepsV2.imSure.check();
      expect(await steps.liveStepsV2.imSure.isChecked()).toBeTruthy();
      await steps.liveStepsV2.endStreamButton.click();
      await steps.page.waitForTimeout(5000);
      await steps.homeSteps.goShows();
    } catch (error) {
      break;
    }
  }
  await steps.page.close();
});
