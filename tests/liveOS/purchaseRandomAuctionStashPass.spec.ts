import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { commonPurchaseListingTest } from "@/steps/liveOS";
import { randomAuctionStashPassDetails } from "@utils/common";
import { RandomAuctionBreakWithStashOrPassListing } from "@/params/listingsParams";
import { account, invalidCreditAcccount } from "@/params/apiParams";

test.describe("Random Auction Stash/Pass test", () => {
  test.skip();
  //https://linear.app/fanaticscollect/issue/FL-497/[dev]-live-panel-should-update-if-spot-is-refunded
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Random Auction Stash/Pass test", async ({ page, browser }) => {
    const liveDetails = randomAuctionStashPassDetails(liveStreamList);
    await commonPurchaseListingTest(
      page,
      browser,
      liveDetails,
      RandomAuctionBreakWithStashOrPassListing,
      account,
      invalidCreditAcccount,
      "Random + auction",
      "100"
    );
  });
});
