import { afterEach, test } from "@fixtures";
import Steps, { createLiveWithOneListingAndGoLiveSteps } from "@/steps/liveOS";
import { gameDetails } from "@utils/common";
import { PickYourSpotSetPriceListing } from "@/params/listingsParams";
import { ApiSteps } from "@/steps/liveOS/api";
import { account } from "@/params/apiParams";

test.describe("Listings test", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("test game", async ({ browser, page }) => {
    const gametitle = "gametitle";
    const liveDetails = gameDetails(liveStreamList);
    const api = new ApiSteps();
    const showname = liveDetails.showName;
    const listingTitle = PickYourSpotSetPriceListing.listingTitle;
    const steps = await createLiveWithOneListingAndGoLiveSteps(
      page,
      liveDetails,
      PickYourSpotSetPriceListing
    );
    await steps.liveStepsV2.createGames(listingTitle, gametitle);
    await api.participeGames(account, showname);
    await steps.liveStepsV2.launchGameGiveaway();
    await steps.liveStepsV2.assertWonGameGiveaway(account.name, gametitle);
    await steps.liveStepsV2.endLive();
  });
});
