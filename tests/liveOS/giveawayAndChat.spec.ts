import { afterEach, test } from "@fixtures";
import { giveawayForAllUsersDetails } from "@utils/common";
import Steps from "@/steps/liveOS";
import { giveawayForAllUsers } from "@/params/liveParams";

test.describe("take over a livestream", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("giveawayForAllUsers test,combine test live chat test)", async ({
    page,
  }) => {
    const steps = new Steps(page);
    const scheduleDetails = giveawayForAllUsersDetails(liveStreamList);

    // combine add mutilpe listings
    const liveListings =
      await steps.createLiveWithListingsAndGoLive(scheduleDetails);
    // combine test live chat test
    await steps.liveStepsV2.typeAndSendMessage("This is a test");
    //

    // combine giveawayForAllUsers test

    await steps.liveStepsV2.createAndStartGiveaway(giveawayForAllUsers);
    await steps.page.waitForTimeout(10000);
    await steps.liveStepsV2.endLive();
    await steps.page.close();
  });
});
