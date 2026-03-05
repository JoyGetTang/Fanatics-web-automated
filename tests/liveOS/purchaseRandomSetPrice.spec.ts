import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import {
  commonPurchaseListingTest,
  createLiveWithOneListingAndGoLiveSteps,
} from "@/steps/liveOS";
import { RandomSetpriceDetails } from "@utils/common";
import {
  NBA30TeamSpotsName,
  RandomSetPriceListing,
} from "@/params/listingsParams";
import { ApiSteps } from "@/steps/liveOS/api";
import { invalidCreditAcccount, account } from "@/params/apiParams";
import { expect } from "@playwright/test";

test.describe("Random + Set price", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Random + Set price", async ({ page, browser }) => {
    const liveDetails = RandomSetpriceDetails(liveStreamList);
    await commonPurchaseListingTest(
      page,
      browser,
      liveDetails,
      RandomSetPriceListing,
      account,
      invalidCreditAcccount,
      "Random + setPrice"
    );
  });

  test("Seller randomly assigns spots after all spots have been sold using the 'Randomize spots' button On the LiveOS: check that all spots are assigned to users", async ({
    page,
  }) => {
    test.skip();
    // https://linear.app/fanaticscollect/issue/FL-496/unable-to-purchase-large-scale-of-random-set-price-spots
    const liveDetails = RandomSetpriceDetails(liveStreamList);
    const showName = liveDetails.showName;
    const steps = await createLiveWithOneListingAndGoLiveSteps(
      page,
      liveDetails,
      RandomSetPriceListing
    );
    await expect(steps.liveStepsV2.randomizeSpotsButton).toBeDisabled();
    const api = new ApiSteps();
    let spotsRemain = 30;
    await api.buyRandomSetPriceSpots(account, showName, spotsRemain);
    await expect(steps.page.getByText("30/30 sold").first()).toBeInViewport({
      timeout: 10000,
    });
    await expect(steps.liveStepsV2.randomizeSpotsButton).toBeEnabled();
    await steps.liveStepsV2.randomizeSpots();
    await steps.liveStepsV2.assertRandomizeSuccess(NBA30TeamSpotsName);
    await steps.liveStepsV2.endLive();
  });
});
