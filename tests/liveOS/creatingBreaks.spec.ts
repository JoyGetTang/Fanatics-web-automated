import { test } from "@fixtures";
import { listingSample } from "@params/listingsParams";
import { addFewProductsDetails } from "@utils/common";
import Steps from "@/steps/liveOS";

test.describe("Creating Breaks", () => {
  test("Add few products / Delete products from your listing", async ({
    page,
  }) => {
    const steps = new Steps(page);
    const scheduleDetails = addFewProductsDetails();
    await steps.basicScheduleNewShow(scheduleDetails);
    await steps.lisitingsSteps.addRandomSetPriceWithMutipleProducts(
      listingSample
    );
    await steps.lisitingsSteps.saveAndAssertAddListing(listingSample, true);
    await steps.lisitingsSteps.addRandomSetPriceWithMutipleProducts(
      listingSample
    );
    await steps.lisitingsSteps.deleteProduct();
    await steps.lisitingsSteps.saveAndAssertAddListing(listingSample, false);
  });
});
