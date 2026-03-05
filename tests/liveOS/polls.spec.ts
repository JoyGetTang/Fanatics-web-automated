import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { createNewPollDetails } from "@utils/common";
import { account, account2nd } from "@/params/apiParams";
import { pollInfo1, pollInfo2, pollInfo3 } from "@/params/liveParams";
import { ApiSteps } from "@/steps/liveOS/api";
import { expect } from "@playwright/test";

test.describe("Polls test", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("polls tests", async ({ page }) => {
    const steps = new Steps(page);
    const api = new ApiSteps();
    const liveDetails = createNewPollDetails(liveStreamList);
    const showname = liveDetails.showName;
    await steps.createLiveWithoutListingsAndGolive(liveDetails);

    // # Verify: the maximum limit of 4 options for a poll, absence of 'Add Option' button and delete button action, and validate poll creation and participation
    await steps.liveStepsV2.createPoll(pollInfo1, pollInfo1.maxOptions, false);

    const pollParticipationResult = await api.participatePoll(
      account,
      showname,
      0
    );
    expect(pollParticipationResult.Participate).toBeTruthy();
    await steps.page.waitForTimeout(3000);

    await steps.liveStepsV2.EndPoll();

    // * Assert: Verify the poll result
    const pollParticipationResultAfterEnd = await api.participatePoll(
      account,
      showname,
      0,
      false
    );
    await steps.liveStepsV2.verifyPollResult(
      pollParticipationResultAfterEnd.expectedPollResultText
    );
    await steps.page.waitForTimeout(10000);

    // # Verify user participation in the event of a tie in the poll
    try {
      await steps.liveStepsV2.createPoll(pollInfo2, pollInfo2.options);
    } catch (error) {
      await steps.homeSteps.goHome();
      await steps.homeSteps.searchAndEnterShow(showname);
      await steps.liveStepsV2.createPoll(pollInfo2, pollInfo2.options, false);
    }

    const firstUserParticipationResult = await api.participatePoll(
      account,
      showname,
      0
    );
    expect(firstUserParticipationResult).toBeTruthy();

    const secondUserParticipationResult = await api.participatePoll(
      account2nd,
      showname,
      1
    );
    expect(secondUserParticipationResult).toBeTruthy();
    await steps.page.waitForTimeout(3000);

    await steps.liveStepsV2.EndPoll();
    await steps.page.waitForTimeout(5000);

    // * Assert: Verify the poll ended in a tie massage in chatBox
    const pollResultTextTie = steps.page.getByText("a tie!");
    await expect(pollResultTextTie).toBeVisible();

    try {
      await steps.liveStepsV2.createPoll(pollInfo3, pollInfo3.options);
    } catch (error) {
      await steps.homeSteps.goHome();
      await steps.homeSteps.searchAndEnterShow(showname);
      await steps.liveStepsV2.createPoll(pollInfo3, pollInfo3.options, false);
    }

    // * Assert: Verify the poll results
    const firstUserParticipationResultAfterEnd = await api.participatePoll(
      account,
      showname,
      0,
      false
    );
    await steps.liveStepsV2.verifyPollResult(
      firstUserParticipationResultAfterEnd.expectedPollResultText
    );

    const secondUserParticipationResultAfterEnd = await api.participatePoll(
      account2nd,
      showname,
      0,
      false
    );
    await steps.liveStepsV2.verifyPollResult(
      secondUserParticipationResultAfterEnd.expectedPollResultText
    );
    await steps.liveStepsV2.endLive();
  });
});
