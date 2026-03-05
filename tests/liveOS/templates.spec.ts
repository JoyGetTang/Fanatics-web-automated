import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { createNewTemplateDetails } from "@utils/common";
import {
  PickYourSpotAuctionBreakWithExtendedBiddingListing,
  PickYourSpotAuctionBreakWithNoBreakListing,
  PickYourSpotSetPriceListing,
  RandomAuctionBreakWithNoBreakListing,
  RandomAuctionBreakWithPick2Choose1Listing,
  RandomAuctionBreakWithStashOrPassListing,
  RandomSetPriceListing,
} from "@/params/listingsParams";

test.describe("Templates test", () => {
  test.skip();
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("add templates", async ({ page }) => {
    const steps = new Steps(page);
    const liveDetails = createNewTemplateDetails(liveStreamList);
    await steps.createLiveWithoutListingsAndGolive(liveDetails);

    await steps.liveStepsV2.addTemplate(
      PickYourSpotSetPriceListing,
      "pickYourSpotSetPrice"
    );

    await steps.liveStepsV2.addTemplate(
      RandomAuctionBreakWithNoBreakListing,
      "randomAuction"
    );

    await steps.liveStepsV2.addTemplate(
      RandomSetPriceListing,
      "randomSetPrice"
    );

    await steps.liveStepsV2.addTemplate(
      PickYourSpotAuctionBreakWithExtendedBiddingListing,
      "pickYourSpotAuction"
    );

    await steps.liveStepsV2.addTemplate(
      PickYourSpotAuctionBreakWithNoBreakListing,
      "pickYourSpotAuction"
    );

    await steps.liveStepsV2.addTemplate(
      RandomAuctionBreakWithPick2Choose1Listing,
      "randomAuction"
    );

    await steps.liveStepsV2.addTemplate(
      RandomAuctionBreakWithStashOrPassListing,
      "randomAuction"
    );

    await steps.liveStepsV2.addTemplate(
      RandomAuctionBreakWithPick2Choose1Listing,
      "randomAuction"
    );

    await steps.liveStepsV2.addTemplate(
      RandomAuctionBreakWithStashOrPassListing,
      "randomAuction"
    );

    await steps.liveStepsV2.endLive();
  });
});
