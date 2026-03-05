import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { randomizeSelectSpotsDetails } from "@utils/common";
import { randommizeListing } from "@/params/listingsParams";
import { expect } from "@playwright/test";

test.describe("Randomize", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Choose spots to randomize and run", async ({ page }) => {
    const steps = new Steps(page);
    const scheduleDetails = randomizeSelectSpotsDetails(liveStreamList);
    await steps.basicScheduleNewShow(scheduleDetails);
    await steps.lisitingsSteps.addRandomSetPrice(randommizeListing);
    await steps.lisitingsSteps.scheduleThisShow();
    await steps.homeSteps.searchAndEnterShow(scheduleDetails.showName);
    await steps.liveStepsV2.goLive();
    await steps.liveStepsV2.featureListing(randommizeListing);
    try {
      await expect(steps.liveStepsV2.randomize).toBeInViewport({
        timeout: 10000,
      });
    } catch (error) {
      await steps.liveStepsV2.liveInteractionsButton.click();
    }
    await steps.liveStepsV2.randomize.click();
    await steps.liveStepsV2.randomizeSpotsList.first().click();
    await steps.liveStepsV2.beginRandomizeButton.click();
    const resultMeassgae = steps.liveStepsV2.randomizeResultMessage;
    await expect(resultMeassgae).toBeInViewport({
      timeout: 15000,
    });
    const computedStyle = await resultMeassgae.evaluate((resultMeassgae) => {
      const style = window.getComputedStyle(resultMeassgae);
      return {
        color: style.getPropertyValue("color"),
      };
    });
    const messageColor = computedStyle.color
      .replace(/[^\d,]/g, "")
      .split(",")
      .map(Number)
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    expect(messageColor).toBe("22C55E");

    await steps.liveStepsV2.endLive();
  });
});
