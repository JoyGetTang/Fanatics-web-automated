import { afterEach, test } from "@fixtures";
import Steps, { createLiveWithoutListingAndGoLiveSteps } from "@/steps/liveOS";
import { singlesDetails } from "@utils/common";
import { ApiSteps } from "@/steps/liveOS/api";
import { singlesRandomSetPriceListing } from "@/params/listingsParams";
import { account } from "@/params/apiParams";
import { expect } from "@playwright/test";

test.describe("Singles listing test", () => {
  test.skip();
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Singles listing test", async ({ page }) => {
    const liveDetails = singlesDetails(liveStreamList);
    const showname = liveDetails.showName;
    const steps = await createLiveWithoutListingAndGoLiveSteps(
      page,
      liveDetails
    );
    const api = new ApiSteps();
    await steps.liveStepsV2.addTemplate(
      singlesRandomSetPriceListing,
      "randomSetPrice"
    );
    await steps.liveStepsV2.featureListing(singlesRandomSetPriceListing);
    const firstPurchaseId = await api.getPurchaseId(account, showname);
    const secondePurchaseId = await api.getPurchaseId(account, showname);
    const firstPurchaseShipping = await api.getShipping(
      account,
      firstPurchaseId
    );
    const secondePurchaseShipping = await api.getShipping(
      account,
      secondePurchaseId
    );
    expect(firstPurchaseShipping).toBe(495);
    expect(secondePurchaseShipping).toBe(0);

    await steps.liveStepsV2.endLive();
  });
});
