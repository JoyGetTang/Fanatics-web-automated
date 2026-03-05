import { afterEach, test } from "@fixtures";
import Steps from "@/steps/liveOS";
import { commonPurchaseListingTest } from "@/steps/liveOS";
import { pickYourSpotSetPriceDetails } from "@utils/common";
import { PickYourSpotSetPriceListing } from "@/params/listingsParams";
import { account, invalidCreditAcccount } from "@/params/apiParams";

test.describe("Pick your spot + Set price test", () => {
  let liveStreamList: string[] = [];
  afterEach(Steps, liveStreamList);

  test("Pick your spot + Set price test", async ({ page, browser }) => {
    const liveDetails = pickYourSpotSetPriceDetails(liveStreamList);
    await commonPurchaseListingTest(
      page,
      browser,
      liveDetails,
      PickYourSpotSetPriceListing,
      account,
      invalidCreditAcccount,
      "PYT + setPrice"
    );
  });
});
