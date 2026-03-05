import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import {
  moveBreakTagetStreamDetails,
  moveBreakOriginStreamDetails,
} from "@utils/common";
import { listingSample } from "@/params/listingsParams";
import { giveawayForFollowersOnly } from "@/params/liveParams";

test.describe("Listings test", () => {
  test.skip();
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Seller can Copy break/Edit listing/move listing to another stream in Listings in LiveOS studio (combine giveawayForFollowersOnly test)", async ({
    page,
  }) => {
    const steps = new Steps(page);
    const originDetails = moveBreakOriginStreamDetails(liveStreamList);
    const targetDetails = moveBreakTagetStreamDetails(liveStreamList);
    const editName = "ListingEdit";
    const listingTitle = listingSample.listingTitle;
    const copyName = "Copy of " + listingSample.listingTitle;
    await steps.createLiveWithoutListingsAndGolive(targetDetails);
    // combine giveawayForFollowersOnly test
    await steps.liveStepsV2.createAndStartGiveaway(giveawayForFollowersOnly);
    await steps.homeSteps.goHome();
    await steps.homeSteps.scheduleNewShow();
    await steps.scheduleSteps.scheduleNewShow(originDetails);
    await steps.lisitingsSteps.scheduleThisShow();
    await steps.homeSteps.searchAndEnterShow(originDetails.showName);
    await steps.liveStepsV2.goLive();
    await steps.liveStepsV2.addTemplate(listingSample, "randomSetPrice");
    await steps.liveStepsV2.copyAListing(listingTitle);
    await steps.liveStepsV2.deleteBreak(copyName);
    await steps.liveStepsV2.editListingName(
      listingSample.listingTitle,
      editName
    );
    await steps.liveStepsV2.moveBreak(editName, targetDetails.showName);
    await steps.liveStepsV2.endLive();
    await steps.homeSteps.goHome();
    await steps.homeSteps.searchAndEnterShow(targetDetails.showName);
    await steps.liveStepsV2.assertlistingExist(editName, true);
    await steps.liveStepsV2.endLive();
  });
});
