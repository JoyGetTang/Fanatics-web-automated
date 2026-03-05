import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { commonPurchaseListingTest } from "@/steps/liveOS";
import { randomAuctionP2C1Details } from "@utils/common";
import { RandomAuctionBreakWithPick2Choose1Listing } from "@/params/listingsParams";
import { account, invalidCreditAcccount } from "@/params/apiParams";

test.describe("Random Auction P2C1", () => {
  test.skip();
  //https://linear.app/fanaticscollect/issue/FL-497/[dev]-live-panel-should-update-if-spot-is-refunded
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Random Auction P2C1", async ({ page, browser }) => {
    const liveDetails = randomAuctionP2C1Details(liveStreamList);
    await commonPurchaseListingTest(
      page,
      browser,
      liveDetails,
      RandomAuctionBreakWithPick2Choose1Listing,
      account,
      invalidCreditAcccount,
      "Random + auction",
      "100"
    );
  });
});
