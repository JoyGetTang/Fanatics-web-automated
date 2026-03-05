import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { performOneUpAuction } from "@/steps/liveOS";
import { purchase1UpAuctionDetails } from "@utils/common";
import { oneUpAuctionInfo } from "@/params/liveParams";
import { account } from "@/params/apiParams";
import { expect } from "@playwright/test";
import { ApiSteps } from "@/steps/liveOS/api";

test.describe("Purchase 1 Up Auction test", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Purchase 1 Up Auction tests", async ({ page }) => {
    const api = new ApiSteps();
    const liveDetails = purchase1UpAuctionDetails(liveStreamList);
    const showname = liveDetails.showName;
    const bidCent = "100";
    const steps = await performOneUpAuction(
      page,
      liveDetails,
      account,
      bidCent,
      oneUpAuctionInfo
    );
    await steps.liveStepsV2.clickListing("One Up Auction 1");
    await expect(steps.page.getByText("1/1 sold").last()).toBeInViewport({
      timeout: 10000,
    });

    await steps.liveStepsV2.downloadCSV();
    await steps.homeSteps.goOrders();
    await expect(steps.ordersSteps.searchArea).toBeInViewport({
      timeout: 10000,
    });

    await steps.ordersSteps.getInStreamDetails(showname);
    await steps.ordersSteps.refundSpots();
    await steps.ordersSteps.refundSpot();
    await steps.ordersSteps.assertRefundSuccess();
    await steps.homeSteps.goHome();
    await steps.homeSteps.searchAndEnterShow(showname);
    await steps.liveStepsV2.clickListing("One Up Auction 1");
    await expect(steps.page.getByText("0/1 sold").last()).toBeInViewport({
      timeout: 10000,
    });
    await steps.liveStepsV2.endLive();
  });
});
