import { Browser, Page, expect } from "@playwright/test";
import { HomeSteps } from "@/steps/liveOS/homePage";
import { ListingsSteps } from "@/steps/liveOS/homePage/listingsPage";
import { ProfileSteps } from "@/steps/liveOS/homePage/profilePage";
import {
  ScheduleDetails,
  ScheduleSteps,
} from "@/steps/liveOS/homePage/schedulePage";
import { ShowsSteps } from "@/steps/liveOS/homePage/showsPage";
import { StorefrontSteps } from "@/steps/liveOS/homePage/storefrontPage";
import { loginParams } from "@/params/loginParams";
import { LoginSteps } from "@/steps/liveOS/loginPage";
import { Listing, Listings, NBA30TeamSpotsName } from "@/params/listingsParams";
import { ApiSteps } from "@/steps/liveOS/api";
import { LiveStepsV2 } from "@/steps/liveOS/homePage/livePage/liveOSv2";
import { OrdersPageSteps } from "./homePage/ordersPage";
import { Account } from "@/params/apiParams";
import {
  getAssignPYTAuctionBuyerInfo,
  getAssignPYTSetPriceBuyerInfo,
  getAssignRandomAuctionBuyerInfo,
  getAssignRandomSetPriceBuyerInfo,
  getPYTAuctionBuyerInfo,
  getPYTSetPriceBuyerInfo,
  getRandomSetPriceBuyerInfo,
} from "@utils/common";
import ClientSteps from "@/steps/webClient";

export interface LiveListing {
  listingType:
    | "Random • Auction"
    | "Random • Set price"
    | "Pick your spot • Auction"
    | "Pick your spot • Set price";
  listingTitle: string;
}

export interface GiveawayInfo {
  title: string;
  type: "All viewers" | "Followers only" | "Upload CSV";
}

export interface OneUpAuctionInfo {
  title: string;
  bid: string;
}

export interface PollInfo {
  title: string;
  options: string[];
  maxOptions: string[];
}

export default class Steps {
  page: Page;
  loginSteps;
  homeSteps;
  lisitingsSteps;
  liveStepsV2;
  ordersSteps;
  profileSteps;
  scheduleSteps;
  showsSteps;
  storefrontSteps;
  apiSteps;
  constructor(page: Page) {
    this.page = page;
    this.loginSteps = new LoginSteps(page);
    this.homeSteps = new HomeSteps(page);
    this.lisitingsSteps = new ListingsSteps(page);
    this.profileSteps = new ProfileSteps(page);
    this.scheduleSteps = new ScheduleSteps(page);
    this.showsSteps = new ShowsSteps(page);
    this.storefrontSteps = new StorefrontSteps(page);
    this.apiSteps = new ApiSteps();
    this.liveStepsV2 = new LiveStepsV2(page);
    this.ordersSteps = new OrdersPageSteps(page);
  }

  async basicScheduleNewShow(scheduleDetails: ScheduleDetails) {
    await this.loginSteps.goTo(loginParams.manageUrl);
    await this.loginSteps.clickShop();
    await this.homeSteps.scheduleNewShow();
    try {
      await expect(this.scheduleSteps.showTitle).toBeInViewport({
        timeout: 3000,
      });
    } catch (error) {
      await this.homeSteps.scheduleNewShow();
    }

    await this.scheduleSteps.scheduleNewShow(scheduleDetails);
    await this.lisitingsSteps.asssertPageLoaded();
  }

  async createLiveWithListings(scheduleDetails: ScheduleDetails) {
    const showName = scheduleDetails.showName;
    const {
      randomAuction,
      randomSetPrice,
      pickYourSpotAuction,
      pickYourSpotSetPrice,
    } = Listings;
    let liveListings: LiveListing[] = [];
    await this.basicScheduleNewShow(scheduleDetails);
    await this.lisitingsSteps.asssertPageLoaded();
    for (const listing of randomSetPrice) {
      await this.lisitingsSteps.addRandomSetPrice(listing.origin);
      const listingInfo: LiveListing = {
        listingType: "Random • Set price",
        listingTitle: listing.origin.listingTitle,
      };
      liveListings.push(listingInfo);
    }
    for (const listing of randomAuction) {
      await this.lisitingsSteps.addRandomAuction(listing.origin);
      const listingInfo: LiveListing = {
        listingType: "Random • Auction",
        listingTitle: listing.origin.listingTitle,
      };
      liveListings.push(listingInfo);
    }

    for (const listing of pickYourSpotAuction) {
      await this.lisitingsSteps.addPickYourSpotAuction(listing.origin);
      const listingInfo: LiveListing = {
        listingType: "Pick your spot • Auction",
        listingTitle: listing.origin.listingTitle,
      };
      liveListings.push(listingInfo);
    }
    for (const listing of pickYourSpotSetPrice) {
      await this.lisitingsSteps.addPickYourSpotSetPrice(listing.origin);
      const listingInfo: LiveListing = {
        listingType: "Pick your spot • Set price",
        listingTitle: listing.origin.listingTitle,
      };
      liveListings.push(listingInfo);
    }
    await this.lisitingsSteps.scheduleThisShow();
    await this.homeSteps.asserPublishedSuccess();
    await this.homeSteps.searchAndEnterShow(showName);
    return liveListings;
  }

  async createLiveWithoutListings(scheduleDetails: ScheduleDetails) {
    const showName = scheduleDetails.showName;
    await this.basicScheduleNewShow(scheduleDetails);
    await this.lisitingsSteps.asssertPageLoaded();
    await this.lisitingsSteps.scheduleThisShow();
    await this.homeSteps.asserPublishedSuccess();
    await this.homeSteps.searchAndEnterShow(showName);
  }

  async createLiveWithListingsAndGoLive(scheduleDetails: ScheduleDetails) {
    const listings = await this.createLiveWithListings(scheduleDetails);
    await this.liveStepsV2.goLive();
    return listings;
  }

  async createLiveWithoutListingsAndGolive(scheduleDetails: ScheduleDetails) {
    await this.createLiveWithoutListings(scheduleDetails);
    await this.liveStepsV2.goLive();
  }

  async loginAndTakeControlAShow(showName: string) {
    await this.loginSteps.goTo(loginParams.manageUrl);
    await this.loginSteps.clickShop();
    await this.homeSteps.searchAndEnterShow(showName);
    // await this.liveStepsV2.defaultCameraSet(),
    await this.liveStepsV2.takeControl();
    await this.page.waitForTimeout(5000);
  }

  async loginAndEditALive(showName: string) {
    await this.loginSteps.goTo(loginParams.manageUrl);
    await this.homeSteps.searchAndEditShow(showName);
    await this.lisitingsSteps.asssertPageLoaded();
  }

  async editScheduleDetailsWithAssertion(
    changeDetails: ScheduleDetails,
    type?: "draft"
  ) {
    await this.lisitingsSteps.editDetails();
    await this.scheduleSteps.scheduleNewShow(changeDetails);
    await this.lisitingsSteps.asssertPageLoaded();

    type
      ? await this.lisitingsSteps.saveAsDraft()
      : (await this.lisitingsSteps.scheduleThisShow(),
        await this.homeSteps.asserPublishedSuccess());
    await this.homeSteps.searchAndEditShow(changeDetails.showName);
    await this.lisitingsSteps.asssertPageLoaded();
    await this.lisitingsSteps.assertDetailsChanges(changeDetails);
  }

  async createLiveWithOneListingAndGoLive(
    scheduleDetails: ScheduleDetails,
    listing: Listing
  ) {
    await this.basicScheduleNewShow(scheduleDetails);
    await this.lisitingsSteps.asssertPageLoaded();
    await this.lisitingsSteps.addListing(listing);
    await this.lisitingsSteps.scheduleThisShow();
    await this.homeSteps.searchAndEnterShow(scheduleDetails.showName);
    await this.liveStepsV2.goLive();
    await this.liveStepsV2.featureListing(listing);
    await this.liveStepsV2.clickListing(listing.listingTitle);
  }
}

export const createLiveWithOneListingAndGoLiveSteps = async (
  page: Page,
  scheduleDetails: ScheduleDetails,
  listings: Listing
) => {
  const steps = new Steps(page);
  await steps.createLiveWithOneListingAndGoLive(scheduleDetails, listings);
  return steps;
};

export const createLiveWithoutListingAndGoLiveSteps = async (
  page: Page,
  scheduleDetails: ScheduleDetails
) => {
  const steps = new Steps(page);
  await steps.createLiveWithoutListingsAndGolive(scheduleDetails);
  return steps;
};

const switchPurchaseType = async (
  steps: Steps,
  purchaseType: string,
  api: ApiSteps,
  account: Account,
  showname: string,
  bidCent?: string
) => {
  switch (purchaseType) {
    case "PYT + setPrice":
      await api.buyPYTsetPrice(account, showname);
      break;
    case "PYT + auction":
      await steps.liveStepsV2.runAuction();
      bidCent && (await api.buyAuctionSpot(account, showname, bidCent));
      await expect(steps.liveStepsV2.auctionNextSpotButton).toBeEnabled({
        timeout: 60000,
      });
      // try {
      //   await expect(steps.liveStepsV2.auctionNextSpotButton).toBeEnabled({
      //     timeout: 60000,
      //   });
      // } catch (error) {
      //   await steps.homeSteps.goHome();
      //   await steps.homeSteps.searchAndEnterShow(showname);
      //   // await steps.liveStepsV2.clickRefresh();
      //   // await steps.liveStepsV2.page.waitForTimeout(5000);
      //   // await steps.liveStepsV2.clickRefresh();
      //   await expect(steps.liveStepsV2.auctionNextSpotButton).toBeEnabled({
      //     timeout: 30000,
      //   });
      // }

      break;
    case "Random + setPrice":
      await api.buyRandomSetPriceSpots(account, showname, 1);
      break;
    case "Random + auction":
      await steps.liveStepsV2.runAuction();
      bidCent && (await api.buyAuctionSpot(account, showname, bidCent));
      await expect(steps.liveStepsV2.auctionNextSpotButton).toBeEnabled({
        timeout: 60000,
      });
      // try {
      //   await expect(steps.liveStepsV2.auctionNextSpotButton).toBeEnabled({
      //     timeout: 60000,
      //   });
      // } catch (error) {
      //   await steps.homeSteps.goHome();
      //   await steps.homeSteps.searchAndEnterShow(showname);
      //   // await steps.liveStepsV2.clickRefresh();
      //   // await steps.liveStepsV2.page.waitForTimeout(5000);
      //   // await steps.liveStepsV2.clickRefresh();
      //   await expect(steps.liveStepsV2.auctionNextSpotButton).toBeEnabled({
      //     timeout: 30000,
      //   });
      // }
      break;
  }
};

export const buyerPaidWithAnInvalidCreditCard = async (
  page: Page,
  liveDetails: ScheduleDetails,
  listing: Listing,
  account: Account,
  purchaseType:
    | "PYT + setPrice"
    | "PYT + auction"
    | "Random + setPrice"
    | "Random + auction",
  bidCent?: string
) => {
  const steps = await createLiveWithOneListingAndGoLiveSteps(
    page,
    liveDetails,
    listing
  );
  const showname = liveDetails.showName;
  const api = new ApiSteps();
  await switchPurchaseType(
    steps,
    purchaseType,
    api,
    account,
    showname,
    bidCent
  );
  bidCent && (await steps.liveStepsV2.assertPaymentFailed());
  await expect(steps.page.getByText("30 spots left").first()).toBeInViewport({
    timeout: 10000,
  });
  // await steps.liveStepsV2.endLive();
};

export const performOneUpAuction = async (
  page: Page,
  liveDetails: ScheduleDetails,
  account: Account,
  bidCent: string,
  oneUpAuctionInfo: OneUpAuctionInfo
) => {
  const api = new ApiSteps();
  const steps = await createLiveWithoutListingAndGoLiveSteps(page, liveDetails);
  await steps.liveStepsV2.createOneUpAuction(oneUpAuctionInfo);
  await expect(steps.page.getByText("One Up Auction 1")).toBeInViewport({
    timeout: 10000,
  });
  await api.buyAuctionSpot(account, liveDetails.showName, bidCent);
  await steps.page.waitForTimeout(15000);
  return steps;
};

export const performPurchase = async (
  page: Page,
  liveDetails: ScheduleDetails,
  listing: Listing,
  account: Account,
  purchaseType:
    | "PYT + setPrice"
    | "PYT + auction"
    | "Random + setPrice"
    | "Random + auction",
  bidCent?: string
) => {
  const showname = liveDetails.showName;
  const username = account.name;
  const steps = await createLiveWithOneListingAndGoLiveSteps(
    page,
    liveDetails,
    listing
  );
  const api = new ApiSteps();
  let res;
  let spotname;
  switch (purchaseType) {
    case "PYT + setPrice":
      res = await api.buyPYTsetPrice(account, showname);
      spotname = res.purchaseSpot.result.breakSpots[0].label;
      break;
    case "PYT + auction":
      await steps.liveStepsV2.runAuction();
      spotname =
        bidCent && (await api.buyAuctionSpot(account, showname, bidCent));
      await steps.page.waitForTimeout(15000);
      break;
    case "Random + setPrice":
      await api.buyRandomSetPriceSpots(account, showname, 1);
      break;
    case "Random + auction":
      await steps.liveStepsV2.runAuction();
      bidCent && (await api.buyAuctionSpot(account, showname, bidCent));
      await steps.page.waitForTimeout(60000);
      break;
  }
  // await steps.page.reload();
  await steps.liveStepsV2.tapBuyersList();
  switch (purchaseType) {
    case "PYT + setPrice":
      const spotPrice = listing.assignPrices; // can't get from res , use this instead
      spotPrice &&
        spotname &&
        (await steps.liveStepsV2.assertBuyersInfo(
          getPYTSetPriceBuyerInfo(username, spotname, spotPrice)
        ));
      break;
    case "PYT + auction":
      bidCent &&
        (await steps.liveStepsV2.assertBuyersInfo(
          getPYTAuctionBuyerInfo(username, spotname, bidCent)
        ));
      break;
    case "Random + setPrice":
      const pricePerSpot = listing.pricePerSpot;
      pricePerSpot &&
        (await steps.liveStepsV2.assertBuyersInfo(
          getRandomSetPriceBuyerInfo(username, pricePerSpot)
        ));
      break;
    case "Random + auction":
      const innerText = await steps.page
        .getByLabel("buyers")
        .locator("div")
        .nth(0)
        .innerText();
      const TextList = innerText.split("\n\n");
      expect(TextList[0]).toEqual("@" + username);
      expect(NBA30TeamSpotsName).toContain(TextList[1]);
      bidCent &&
        // expect(TextList[2]).toEqual(`$${parseFloat(bidCent).toFixed(2)}`);
        expect(TextList[2]).toEqual(`$${parseFloat(bidCent)}`);

      break;
  }
  await steps.liveStepsV2.endLive();
};

export const refundSpot = async (
  page: Page,
  liveDetails: ScheduleDetails,
  listing: Listing,
  account: Account,
  purchaseType:
    | "PYT + setPrice"
    | "PYT + auction"
    | "Random + setPrice"
    | "Random + auction",
  bidCent?: string
) => {
  const showname = liveDetails.showName;
  const steps = await createLiveWithOneListingAndGoLiveSteps(
    page,
    liveDetails,
    listing
  );
  const api = new ApiSteps();
  await switchPurchaseType(
    steps,
    purchaseType,
    api,
    account,
    showname,
    bidCent
  );
  await steps.homeSteps.goOrders();
  await expect(steps.ordersSteps.searchArea).toBeInViewport({ timeout: 10000 });
  await steps.ordersSteps.getInStreamDetails(showname);
  await steps.ordersSteps.refundSpots();
  await steps.ordersSteps.refundSpot();
  await steps.ordersSteps.assertRefundSuccess();
  await steps.homeSteps.goHome();
  await steps.homeSteps.searchAndEnterShow(showname);
  await expect(steps.page.getByText("30 spots left").first()).toBeInViewport({
    timeout: 10000,
  });
  await steps.liveStepsV2.endLive();
};

export const downloadCSV = async (
  page: Page,
  liveDetails: ScheduleDetails,
  listing: Listing,
  account: Account,
  purchaseType:
    | "PYT + setPrice"
    | "PYT + auction"
    | "Random + setPrice"
    | "Random + auction",
  bidCent?: string
) => {
  const showname = liveDetails.showName;
  const steps = await createLiveWithOneListingAndGoLiveSteps(
    page,
    liveDetails,
    listing
  );
  const api = new ApiSteps();
  await expect(steps.liveStepsV2.downloadCSVButton).toBeHidden();
  await switchPurchaseType(
    steps,
    purchaseType,
    api,
    account,
    showname,
    bidCent
  );
  await expect(steps.liveStepsV2.downloadCSVButton).toBeInViewport({
    timeout: 10000,
  });
  await steps.liveStepsV2.downloadCSV();
  await steps.liveStepsV2.endLive();
};

export const assignSpot = async (
  page: Page,
  liveDetails: ScheduleDetails,
  listing: Listing,
  account: Account,
  purchaseType:
    | "PYT + setPrice"
    | "PYT + auction"
    | "Random + setPrice"
    | "Random + auction"
) => {
  const showName = liveDetails.showName;
  const steps = await createLiveWithOneListingAndGoLiveSteps(
    page,
    liveDetails,
    listing
  );
  const username = account.name;
  const assignSpotName = await steps.liveStepsV2.assignSpot(username);
  // await steps.page.reload();
  await steps.liveStepsV2.tapBuyersList();
  switch (purchaseType) {
    case "PYT + setPrice":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignPYTSetPriceBuyerInfo(username, assignSpotName)
      );
      break;
    case "PYT + auction":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignPYTAuctionBuyerInfo(username, assignSpotName)
      );
      break;
    case "Random + setPrice":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignRandomSetPriceBuyerInfo(username)
      );
      break;
    case "Random + auction":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignRandomAuctionBuyerInfo(username, assignSpotName)
      );
      break;
  }
  await steps.liveStepsV2.endLive();
  await steps.homeSteps.goOrders();
  await expect(steps.ordersSteps.searchArea).toBeInViewport({
    timeout: 10000,
  });
  await steps.ordersSteps.goComletedStreams();
  await steps.ordersSteps.getInStreamDetails(showName);
  await steps.ordersSteps.assertOrderFreeOrRefunded();
};

export const commonPurchaseListingTest = async (
  page: Page,
  browser: Browser,
  liveDetails: ScheduleDetails,
  listing: Listing,
  account: Account,
  invalidCreditAcccount: Account,
  purchaseType:
    | "PYT + setPrice"
    | "PYT + auction"
    | "Random + setPrice"
    | "Random + auction",
  bidCent?: string
) => {
  //performPurchase
  const showname = liveDetails.showName;
  const username = account.name;
  const steps = await createLiveWithOneListingAndGoLiveSteps(
    page,
    liveDetails,
    listing
  );
  const api = new ApiSteps();
  // const clientContext = await browser.newPage({ storageState: clientAuthFile });
  // const clientSteps = new ClientSteps(clientContext);
  // await clientSteps.loginAndEnterShow(showname);
  // await expect(steps.liveStepsV2.downloadCSVButton).toBeHidden();
  let res;
  let spotname;
  let changePrice = "999";

  //Assign a spot to the user
  await steps.liveStepsV2.clickListing(listing.listingTitle);
  const assignSpotName = await steps.liveStepsV2.assignSpot(username);
  switch (purchaseType) {
    case "PYT + setPrice":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignPYTSetPriceBuyerInfo(username, assignSpotName)
      );
      break;
    case "PYT + auction":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignPYTAuctionBuyerInfo(username, assignSpotName)
      );
      break;
    case "Random + setPrice":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignRandomSetPriceBuyerInfo(username)
      );
      break;
    case "Random + auction":
      await steps.liveStepsV2.assertBuyersInfo(
        getAssignRandomAuctionBuyerInfo(username, assignSpotName)
      );
      break;
  }
  //Unassign a spot

  await steps.liveStepsV2.unassginSpot();

  switch (purchaseType) {
    case "PYT + setPrice":
      // await clientSteps.liveSteps.clickBuy();
      // await steps.liveStepsV2.changeSpotPrice(changePrice);
      // spotname = await steps.liveStepsV2.firstSpotName.innerText();
      // await clientSteps.liveSteps.assertSpotPrice(spotname, changePrice);
      res = await api.buyPYTsetPrice(account, showname);
      spotname = res.purchaseSpot.result.breakSpots[0].label;
      break;
    case "PYT + auction":
      await steps.liveStepsV2.runAuctionAtlantaHawks();
      // await expect(clientSteps.liveSteps.customBidButton).toBeInViewport({
      //   timeout: 10000,
      // });
      spotname =
        bidCent && (await api.buyAuctionSpot(account, showname, bidCent));
      await steps.page.waitForTimeout(15000);
      break;
    case "Random + setPrice":
      await api.buyRandomSetPriceSpots(account, showname, 1);
      break;
    case "Random + auction":
      await steps.liveStepsV2.runAuction();
      bidCent && (await api.buyAuctionSpot(account, showname, bidCent));
      await steps.page.waitForTimeout(60000);
      break;
  }
  // try {
  //   await clientSteps.liveSteps.assertWon(purchaseType);
  // } catch (error) {
  //   await clientSteps.page.reload();
  //   await clientSteps.liveSteps.assertWon(purchaseType);
  // }
  // await steps.liveStepsV2.clickListingsAction(listing.listingTitle);
  await steps.liveStepsV2.clickCustomers();
  // await steps.liveStepsV2.tapBuyersList();
  switch (purchaseType) {
    case "PYT + setPrice":
      const spotPrice = listing.assignPrices;
      spotPrice &&
        spotname &&
        (await steps.liveStepsV2.assertBuyersInfo(
          getPYTSetPriceBuyerInfo(username, spotname, spotPrice)
        ));
      expect(
        await api.assertSpotByApi(
          account,
          showname,
          "SET_PRICE",
          "PICK_YOUR_SLOT"
        )
      ).toBeTruthy();
      break;
    case "PYT + auction":
      bidCent &&
        (await steps.liveStepsV2.assertBuyersInfo(
          getPYTAuctionBuyerInfo(username, spotname, bidCent)
        ));
      expect(
        await api.assertSpotByApi(
          account,
          showname,
          "AUCTION",
          "PICK_YOUR_SLOT"
        )
      ).toBeTruthy();
      // await clientSteps.liveSteps.assertWon(purchaseType);
      break;
    case "Random + setPrice":
      const pricePerSpot = listing.pricePerSpot;
      pricePerSpot &&
        (await steps.liveStepsV2.assertBuyersInfo(
          getRandomSetPriceBuyerInfo(username, pricePerSpot)
        ));
      expect(
        await api.assertSpotByApi(account, showname, "SET_PRICE", "RANDOM")
      ).toBeTruthy();
      break;
    case "Random + auction":
      try {
        const innerText = await steps.page
          .locator('[data-testid="virtuoso-item-list"] > div:nth-child(1)')
          .innerText();
        const TextList = innerText.split("\n\n");
        expect(TextList[0]).toEqual("@" + username);
        expect(NBA30TeamSpotsName).toContain(TextList[1]);
        bidCent &&
          // expect(TextList[2]).toEqual(`$${parseFloat(bidCent).toFixed(2)}`);
          expect(TextList[2]).toEqual(`$${parseFloat(bidCent)}`);
      } catch (error) {
        await steps.liveStepsV2.clickRefresh();
        await steps.page.waitForTimeout(5000);
        const innerText = await steps.page
          .locator('[data-testid="virtuoso-item-list"] > div:nth-child(1)')
          .innerText();
        const TextList = innerText.split("\n\n");
        expect(TextList[0]).toEqual("@" + username);
        expect(NBA30TeamSpotsName).toContain(TextList[1]);
        bidCent &&
          // expect(TextList[2]).toEqual(`$${parseFloat(bidCent).toFixed(2)}`);
          expect(TextList[2]).toEqual(`$${parseFloat(bidCent)}`);
      }
      expect(
        await api.assertSpotByApi(account, showname, "AUCTION", "RANDOM")
      ).toBeTruthy();
      break;
  }

  //downloadCSV

  // await expect(steps.liveStepsV2.downloadCSVButton).toBeInViewport({
  //   timeout: 10000,
  // });
  await steps.liveStepsV2.clickSpotsTab();
  await steps.liveStepsV2.downloadCSV();

  // refund spot

  await steps.homeSteps.goOrders();
  await expect(steps.ordersSteps.searchArea).toBeInViewport({
    timeout: 10000,
  });
  await steps.ordersSteps.getInStreamDetails(showname);
  await steps.ordersSteps.refundSpots();
  await steps.ordersSteps.refundSpot();
  await steps.ordersSteps.assertRefundSuccess();
  await steps.homeSteps.goHome();
  await steps.homeSteps.searchAndEnterShow(showname);
  await expect(steps.page.getByText("0/30 sold").first()).toBeInViewport({
    timeout: 10000,
  });
  // await clientSteps.liveSteps.assertRefundSuccess();

  //buyer paid with an invalid credit card ## remove
  // await switchPurchaseType(
  //   steps,
  //   purchaseType,
  //   api,
  //   invalidCreditAcccount,
  //   showname,
  //   bidCent
  // )
  // bidCent && (await steps.liveStepsV2.assertPaymentFailed());
  // await expect(steps.page.getByText("30 spots left").first()).toBeInViewport({
  //   timeout: 10000,
  // });

  // await clientSteps.liveSteps.assertAssign(purchaseType, false);
  // await clientSteps.liveSteps.page.close();
  await steps.liveStepsV2.endLive();
};
