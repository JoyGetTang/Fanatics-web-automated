import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { commonPurchaseListingTest } from "@/steps/liveOS";
import { pickYourSpotAuctionDetails } from "@utils/common";
import { PickYourSpotAuctionBreakWithNoBreakListing } from "@/params/listingsParams";
import { account, invalidCreditAcccount } from "@/params/apiParams";

test.describe("Pick your spot Auction test", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Pick your spot Auction test", async ({ page, browser }) => {
    const liveDetails = pickYourSpotAuctionDetails(liveStreamList);
    await commonPurchaseListingTest(
      page,
      browser,
      liveDetails,
      PickYourSpotAuctionBreakWithNoBreakListing,
      account,
      invalidCreditAcccount,
      "PYT + auction",
      "100"
    );
  });
});
