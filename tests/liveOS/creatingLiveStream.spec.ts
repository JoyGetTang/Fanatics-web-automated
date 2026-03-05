import { test } from "@fixtures";
import { createUnpublishedDetails, createUpcomingDetails } from "@utils/common";
import Steps from "@/steps/liveOS";

test.describe("Schedule shows", () => {
  const unpublishedShowDetails = createUnpublishedDetails();
  const upcomingShowDetails = createUpcomingDetails();

  test("Schedule unpublished show", async ({ page }) => {
    const steps = new Steps(page);
    const showName = unpublishedShowDetails.showName;
    await steps.basicScheduleNewShow(unpublishedShowDetails);
    await steps.lisitingsSteps.saveAsDraft();
    await steps.homeSteps.searchShow(showName);
    try {
      await steps.homeSteps.assertShowName(showName);
    } catch (error) {
      await steps.homeSteps.page.reload();
      await steps.homeSteps.searchShow(showName);
      await steps.homeSteps.assertShowName(showName);
    }
    steps.homeSteps.assertUnpublished(showName);
  });

  test("Schedule upcoming show", async ({ page }) => {
    const steps = new Steps(page);
    const showName = upcomingShowDetails.showName;
    await steps.basicScheduleNewShow(upcomingShowDetails);
    await steps.lisitingsSteps.scheduleThisShow();
    await steps.homeSteps.asserPublishedSuccess();
    await steps.homeSteps.searchShow(showName);
    try {
      await steps.homeSteps.assertShowName(showName);
    } catch (error) {
      await steps.homeSteps.page.reload();
      await steps.homeSteps.searchShow(showName);
      await steps.homeSteps.assertShowName(showName);
    }
    steps.homeSteps.assertUpcoming(showName);
  });
});
