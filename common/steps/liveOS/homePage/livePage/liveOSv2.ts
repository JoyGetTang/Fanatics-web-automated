import { LivePageV2 } from "@/pages/liveOs/homePage/livePage/liveOSv2";
import { Listing } from "@/params/listingsParams";
import { expect } from "@playwright/test";
import exp from "constants";

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
}

export class LiveStepsV2 extends LivePageV2 {
  async goLive() {
    try {
      await expect(this.goLiveButton).toBeInViewport({
        timeout: 10000,
      });
    } catch {
      await this.page.reload();
      await this.page.waitForTimeout(10000);
    }
    try {
      await this.defaultCameraSet();
    } catch (error) {
      await this.page.reload();
      await this.page.waitForTimeout(10000);
      await this.defaultCameraSet();
    }
    await this.goLiveButton.click({ timeout: 10000 });
    // await expect(this.endShowButton).toBeInViewport({
    //   timeout: 20000,
    // });
  }

  async endLive() {
    await this.endShowButton.click({ timeout: 10000 });
    await this.imSure.check();
    expect(await this.imSure.isChecked()).toBeTruthy();
    await this.endStreamButton.click();
    try {
      await expect(this.goLiveButton).toBeInViewport({
        timeout: 20000,
      });
    } catch (error) {}
  }

  async takeLiveControl() {
    await this.takeControlButton.click({ timeout: 10000 });
    // await this.doItNowButton.click();
    await expect(this.endShowButton).toBeInViewport({
      timeout: 10000,
    });
  }

  async editStreamControls() {
    await this.editStreamControlsButton.click();
  }

  async selectProductCamera(option?: string) {
    const cameraOption = option || "fake_device_0";
    await this.productCameraOption.selectOption(cameraOption);
  }

  async selectTalentCamera(option?: string) {
    const cameraOption = option || "fake_device_0";
    await this.talentCameraOption.selectOption(cameraOption);
  }

  async selectSecurityCamera(option?: string) {
    const cameraOption = option || "fake_device_0";
    await this.securityCameraOption.selectOption(cameraOption);
  }

  async selectAudioSource(option?: string) {
    const MicrophoneOption = option || "Fake Default Audio Input";
    await this.audioSourceOption.selectOption(MicrophoneOption);
  }

  async saveStreamControls() {
    await this.saveStreamControlsButton.click();
  }

  async selectListingWithType(list: LiveListing) {
    expect(
      this.page
        .locator("div")
        .filter({ hasText: list.listingType })
        .filter({ hasText: list.listingTitle })
        .last()
    ).toBeTruthy();
  }

  async selectListingWithTitle(list: Listing) {
    await this.page
      .locator("div")
      .filter({ hasText: list.listingTitle })
      .last()
      .click();
    // await expect(this.page.getByText("Featured")).toBeInViewport({
    //   timeout: 10000,
    // });
  }

  async featureListing(list: Listing) {
    await this.clickListingsAction(list.listingTitle);
    await this.featureListingButton.click();
  }

  // async createAndStartGiveaway(giveawayInfo: GiveawayInfo) {
  //   await this.streamControlsButton.click();
  //   try {
  //     await this.liveInteractionsTap.click();
  //   } catch (error) {
  //     await this.streamControlsButton.click();
  //   }
  //   try {
  //     await this.startGiveaway(giveawayInfo);
  //   } catch (error) {
  //     await this.startGiveaway(giveawayInfo);
  //   }
  // }

  async createAndStartGiveaway(giveawayInfo: GiveawayInfo) {
    await this.page.waitForTimeout(5000);
    try {
      await expect(this.giveawayButton).toBeEnabled({ timeout: 5000 });
    } catch (error) {
      await this.liveInteractionsButton.click();
    }
    await this.startGiveaway(giveawayInfo);
  }

  async startGiveaway(giveawayInfo: GiveawayInfo) {
    // await this.liveInteractionsTap.click();
    try {
      await expect(this.giveawayButton).toBeEnabled({ timeout: 5000 });
    } catch (error) {
      await this.liveInteractionsButton.click();
    }
    await this.giveawayButton.click();
    await this.giveawayFormTitle.fill(giveawayInfo.title);
    switch (giveawayInfo.type) {
      case "All viewers":
        this.giveawayFormAllViewers.click();
        break;
      case "Followers only":
        this.giveawayFormFollowersOnly.click();
        break;
      case "Upload CSV":
        this.giveawayFormUploadCSV.click();
        break;
    }
    await this.giveawayLaunchButton.click();
    expect(this.giveawayTimer, "begin giveaway");
  }

  // async createOneUpAuction(oneUpAuctionInfo: OneUpAuctionInfo) {
  //   await this.streamControlsButton.click();
  //   try {
  //     await this.liveInteractionsTap.click();
  //   } catch (error) {
  //     await this.streamControlsButton.click();
  //   }
  //   await this.liveInteractionsTap.click();
  //   await this.oneUpAuction.click();
  //   await this.auctionFormTitle.fill(oneUpAuctionInfo.title);
  //   await this.auctionStartingBid.fill(oneUpAuctionInfo.bid);
  //   await this.extendingBidding.check();
  //   await expect(this.runAuctionButton).toBeEnabled({ timeout: 3000 });
  //   await this.runAuctionButton.click();
  //   expect(this.oneUpAuctionTimer, "Begin one up");
  // }

  async createOneUpAuction(oneUpAuctionInfo: OneUpAuctionInfo) {
    await this.page.waitForTimeout(5000);
    try {
      await expect(this.oneUpAuction).toBeEnabled({ timeout: 5000 });
    } catch (error) {
      await this.liveInteractionsButton.click();
    }
    // await this.liveInteractionsButton.click();
    await this.oneUpAuction.click();
    await this.auctionFormTitle.fill(oneUpAuctionInfo.title);
    await this.auctionStartingBid.fill(oneUpAuctionInfo.bid);
    await this.typeSelection.selectOption("Singles");
    await this.leagueSelection.selectOption("NBA");
    // await this.breakTypeSelection.selectOption("Personal");
    await this.extendingBidding.check();
    await expect(this.runAuctionButton).toBeEnabled({ timeout: 3000 });
    await this.runAuctionButton.click();
    expect(this.oneUpAuctionTimer, "Begin one up");
    await this.page.waitForTimeout(3000);
  }

  async createPoll(
    pollInfo: PollInfo,
    options: string[],
    isPollFormVisible: boolean = true
  ) {
    try {
      await expect(this.pollFormCreate).toBeInViewport({
        timeout: 10000,
      });
    } catch (error) {
      await this.liveInteractionsButton.click();
    }
    if (!isPollFormVisible) {
      await this.pollFormCreate.click();
    }
    try {
      await expect(this.endPollButton).toBeHidden({
        timeout: 10000,
      });
    } catch (error) {
      await this.endPollButton.click();
    }
    await this.pollFormTitle.fill(pollInfo.title);
    const OptionsCount = await this.getPollOptions(options);

    if (OptionsCount == 4) {
      const maxOptions = 4;
      expect(OptionsCount).toBeLessThanOrEqual(maxOptions);
      const addOptionButton = this.pollFormAddOption;
      expect(addOptionButton).not.toBeVisible();
      await this.deleteOptionPoll(3);
      const NewOptionsCount = await this.pollFormOptions.count();
      expect(NewOptionsCount).toBeLessThanOrEqual(3);
    }

    await this.pollFormDuration.selectOption("2 minutes");
    await this.pollFormPublish.click();
    try {
      await expect(this.endPollButton).toBeInViewport();
    } catch (error) {
      await this.pollFormPublish.click();
      await expect(this.endPollButton).toBeInViewport();
    }
  }

  async getPollOptions(options: string[]) {
    await this.pollFormOptions.nth(0).fill(options[0]);
    await this.pollFormOptions.nth(1).fill(options[1]);

    if (options.length > 2) {
      for (let i = 2; i < options.length && options.length <= 4; i++) {
        await this.pollFormAddOption.click();
        await this.pollFormOptions.nth(i).fill(options[i]);
      }
    }

    return await this.pollFormOptions.count();
  }

  async deleteOptionPoll(nthPoll: number) {
    await this.pollFormDeleteOption.nth(nthPoll).click();
  }

  async EndPoll() {
    await this.endPollButton.click();
  }

  async verifyPollResult(expectedPollResultText: string) {
    await this.viewPollResultsTab.click();
    await this.viewPollResult.first().click();

    // Verify the poll result
    const pollResultText = this.page.getByText(expectedPollResultText);
    await expect(pollResultText).toBeVisible();

    await this.createPollTab.click();
  }

  async defaultCameraSet() {
    await this.selectProductCamera();
    await this.selectTalentCamera();
    await this.selectSecurityCamera();
    await this.selectAudioSource();
  }

  async assertListingCount(count: number) {
    await expect(this.allSpotsListingTab).toBeInViewport({ timeout: 15000 });
    await expect(this.listingItems).toHaveCount(count);
  }

  async assertListingStatus(
    listing: LiveListing,
    status: "Coming up" | "Ended" | "Now breaking"
  ) {
    expect(
      this.page
        .locator("div")
        .filter({ hasText: listing.listingType })
        .filter({ hasText: listing.listingTitle })
        .filter({ hasText: status })
        .last()
    );
  }
  async assertAuctionFailed() {
    await expect(this.auctionFailed).toBeInViewport({
      timeout: 20000,
    });
  }

  async assertLiveHasBeingTakenControl() {
    await expect(this.hasBeingTakenControlBySomeone).toBeInViewport({
      timeout: 10000,
    });
  }

  async assertGiveawayFinished() {
    await this.giveawayTimer.waitFor({ state: undefined, timeout: 6000 });
    expect(this.giveawayTimer).toBeUndefined();
  }

  async takeControl() {
    try {
      await this.takeControlButton.click({ timeout: 10000 });
    } catch (error) {
      await this.page.reload();
      await this.takeControlButton.click({ timeout: 10000 });
    }
  }

  async addListing() {
    await this.addListingsButton.click();
  }

  async traditionalListing() {
    await this.traditionalListingButton.click();
  }

  async inputListingName(listingName: string) {
    await this.addListingNameField.fill(listingName);
  }

  async selectSpot(listing: Listing) {
    await this.selectSpotListOptions.selectOption(listing.listingName);
  }

  async inputTitleAndSelectListing(listing: Listing) {
    await this.inputListingName(listing.listingTitle);
    await this.selectSpot(listing);
  }

  async saveNewListing() {
    await this.saveListingButton.click();
    await this.page.waitForTimeout(3000);
  }

  async addShippingProfile(option: string = "christine shetler") {
    await this.shippingProfile.selectOption(option);
  }

  async commonFinishListing(listing: Listing) {
    await this.commonAddProduct(listing);
    // await this.addShippingProfile();
    await this.saveNewListing();
  }

  async commonAddProduct(listing: Listing) {
    await this.clickAddProductsToYourListing();
    await this.searchProduct(listing.product?.name || "NBA");
    await this.selectFirstProduct();
    await this.closeSearchModal();
    await this.inputCost(listing.product?.cost || "100");
    await this.page.waitForTimeout(1000);
  }

  async clickAddProductsToYourListing() {
    await this.searchYourInventoryButton.click();
  }
  async searchProduct(productName: string) {
    await this.inputSearchItemField.fill(productName);
  }

  async inputCost(cost: string) {
    await this.firstItemCost.fill(cost);
  }

  async selectFirstProduct() {
    await this.firstItem.click();
  }

  async closeSearchModal() {
    await this.closeAddItemsModal.click();
  }

  async selectRandom() {
    await this.random.click();
    await this.page.waitForTimeout(1000);
  }

  async selectPickYourSpot() {
    await this.pickYour.click();
    await this.page.waitForTimeout(1000);
  }

  async selectSetPrice() {
    await this.fixedPrice.click();
    await this.page.waitForTimeout(1000);
  }
  async selectAuction() {
    await this.auction.click();
    await this.page.waitForTimeout(1000);
  }

  async inputPricePerSpot(pricePerSpot: string) {
    await this.randomSetPriceInCents.fill(pricePerSpot);
    await this.page.waitForTimeout(1000);
  }

  async clickAuctionSettings() {
    await this.auctionSettingButton.click();
    await this.page.waitForTimeout(1000);
  }

  async submitAssignPrices() {
    await this.assignPricesSubmitButton.click();
    await this.page.waitForTimeout(1000);
  }

  async backToEditPage() {
    await this.backToEditPageButton.click();
  }

  async inputMinBid(minbid: string) {
    await this.minimumBid.fill(minbid);
    await this.page.waitForTimeout(1000);
  }

  async selectExtendedBidding() {
    await this.extendedBidding.check();
    await this.page.waitForTimeout(1000);
  }

  async selectStashOrPass() {
    await this.stashOrPass.check();
    await this.page.waitForTimeout(1000);
  }

  async selectPick2Choose1() {
    await this.pick2Choose1.check();
    await this.page.waitForTimeout(1000);
  }

  async selectNone() {
    await this.nonePick.check();
    await this.page.waitForTimeout(1000);
  }

  async inputMinRequired(miniRequired: string) {
    await this.minRequired.fill(miniRequired);
    await this.page.waitForTimeout(1000);
  }

  async saveBreakExtras() {
    await this.saveBreakExtrasButton.click();
    await this.page.waitForTimeout(1000);
  }

  async setStashOrPass(miniRequired: string) {
    await this.selectStashOrPass();
    await this.inputMinRequired(miniRequired);
  }

  async setPick2Choose1(miniRequired: string) {
    await this.selectPick2Choose1();
    await this.inputMinRequired(miniRequired);
  }

  async clickAssignPrice() {
    await this.assignPricesButton.click();
  }

  // async inputAssignPrices(assignPrices: string) {
  //   var i = 0;
  //   for (; i < 30; ) {
  //     await this.page
  //       .locator(`input[name="breakSpots\\.${i}\\.priceInCents"]`)
  //       .fill(assignPrices);
  //     i++;
  //   }
  // }

  async inputAssignPrices(assignPrices: string) {
    await this.page
      .locator(`input[name="breakSpots.0.priceInCents"]`)
      .fill(assignPrices);
  }

  async addRandomSetPrice(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.selectRandom();
    await this.selectSetPrice();
    await this.page.waitForTimeout(1000);
    listing.pricePerSpot &&
      (await this.inputPricePerSpot(listing.pricePerSpot));
    await this.commonFinishListing(listing);
  }

  async addRandomAuction(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.selectRandom();
    await this.selectAuction();
    if (listing.breakExtras) {
      await this.clickAuctionSettings();
      switch (listing.breakExtras.extrasType?.extrasType) {
        case "stashOrPass":
          await this.setStashOrPass(
            listing.breakExtras.extrasType.miniRequired
          );
          break;
        case "pick2Choose1":
          await this.setPick2Choose1(
            listing.breakExtras.extrasType.miniRequired
          );
          break;
        case "None":
          await this.selectNone();
          break;
      }
      listing.breakExtras?.extendedBidding == false &&
        (await this.selectExtendedBidding());
      await this.backToEditPage();
    }
    listing.minbid && (await this.inputMinBid(listing.minbid));
    await this.page.waitForTimeout(1000);
    await this.commonFinishListing(listing);
  }

  async addPickYourSpotSetPrice(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.selectPickYourSpot();
    await this.selectSetPrice();
    await this.clickAssignPrice();
    listing.assignPrices &&
      (await this.inputAssignPrices(listing.assignPrices));
    await this.backToEditPage();
    await this.page.waitForTimeout(1000);
    await this.commonFinishListing(listing);
  }

  async addPickYourSpotAuction(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.selectPickYourSpot();
    await this.selectAuction();
    if (listing.breakExtras?.extendedBidding !== undefined) {
      await this.clickAuctionSettings();
      await this.selectExtendedBidding();
      await this.page.waitForTimeout(1000);
      await this.saveBreakExtras();
    }
    listing.minbid && (await this.inputMinBid(listing.minbid));
    await this.commonFinishListing(listing);
  }

  async assertAddListingSuccess(listing: Listing) {
    await expect(
      this.page
        .locator(".flex > .flex > .flex  ")
        .filter({ hasText: listing.listingTitle })
        .last()
    ).toBeInViewport({ timeout: 10000 });
    //   .click();
    // await expect(this.page.getByText("Featured")).toBeInViewport({
    //   timeout: 5000,
    // });
  }

  async addTemplate(
    listing: Listing,
    type:
      | "randomAuction"
      | "randomSetPrice"
      | "pickYourSpotSetPrice"
      | "pickYourSpotAuction"
  ) {
    await this.addListing();
    await this.page.waitForTimeout(1000);
    try {
      await this.traditionalListing();
    } catch (error) {}
    switch (type) {
      case "randomAuction":
        await this.addRandomAuction(listing);
        break;
      case "randomSetPrice":
        await this.addRandomSetPrice(listing);
        break;
      case "pickYourSpotAuction":
        await this.addPickYourSpotAuction(listing);
        break;
      case "pickYourSpotSetPrice":
        await this.addPickYourSpotSetPrice(listing);
        break;
    }
    await this.assertAddListingSuccess(listing);
  }

  async typeAndSendMessage(messgae: string) {
    // wait to solve https://fanaticslive.clickup.com/t/8686yzhg9
    try {
      await expect(this.typeYourMessageField).toBeInViewport();
    } catch (error) {
      await this.page.reload();
      await expect(this.typeYourMessageField).toBeInViewport({
        timeout: 20000,
      });
    }
    await this.page.waitForTimeout(2000);
    await this.typeYourMessageField.fill(messgae);
    await this.sendMessageButton.click();
    await this.assertMessageSendSuccess(messgae);
  }

  async assertMessageSendSuccess(messgae: string) {
    await expect(this.page.getByText(messgae)).toBeInViewport({
      timeout: 3000,
    });
    // await expect(
    //   this.page
    //     .getByTestId("message-text-inner-wrapper")
    //     .last()
    //     .filter({ hasText: messgae })
    // ).toBeInViewport({ timeout: 5000 });
    // await expect(this.page.getByTestId("delivered-icon")).toBeInViewport({
    //   timeout: 5000,
    // });
  }

  async clickListingsAction(listingTitle: string) {
    await this.page
      .locator(".flex > .flex > .flex  ")
      .filter({ has: this.page.getByText(listingTitle, { exact: true }) })
      .nth(1)
      .getByRole("button")
      .nth(0)
      .click();
  }
  async copyAListing(listingTitle: string) {
    await this.clickListingsAction(listingTitle);
    await this.copyBreakButton.click();
    await this.saveNewListing();
  }

  async clickCustomers() {
    await this.customersTab.click();
  }

  async clickSold() {
    await this.soldTab.click();
  }

  async clickSpotsTab() {
    await this.spotsTab.click();
  }

  async editListingName(listingTitle: string, newName?: string) {
    await this.clickListingsAction(listingTitle);
    await this.editNameButton.click();
    await this.inputListingName(newName || "listingNameEdit");
    await this.saveNewListing();
    // await this.assertlistingExist(newName || "listingNameEdit", true);

    // await expect(
    //   this.page.getByText(newName || "listingNameEdit")
    // ).toBeInViewport({
    //   timeout: 10000,
    // });
  }

  async clickListing(listingTitle: string) {
    // await this.page
    //   .locator("main > div:nth-child(2) > div")
    //   .filter({ has: this.page.getByText(listingTitle, { exact: true }) })
    //   .click();

    await this.page
      .locator(".flex > .flex > .flex  ")
      .filter({ has: this.page.getByText(listingTitle, { exact: true }) })
      .nth(1)
      .click();
  }

  async deleteBreak(listingTitle: string) {
    await this.clickListingsAction(listingTitle);
    await this.deleteBreakOptionButton.click();
    await expect(this.deleteBreakConfirmModal).toBeInViewport({
      timeout: 3000,
    });
    // await this.imSure.check();
    // await expect(this.deleteBreakButton).toBeEnabled({ timeout: 3000 });
    await this.deleteBreakButton.click({ timeout: 3000 });
  }

  async moveBreak(listingTitle: string, liveName: string) {
    await this.clickListingsAction(listingTitle);
    await this.moveToAnotherStreamButton.click();
    // await this.upcomingLiveTap.click();
    let tryTimes = 3;
    while (tryTimes > 0) {
      try {
        await this.page.getByLabel(liveName).click();
      } catch (error) {
        await this.page.getByRole("button", { name: "Next" }).click();
      }
      tryTimes--;
    }

    await this.moveBreakButton.click();
  }

  async assertlistingExist(listingName: string, exist?: boolean) {
    // await expect(this.hideListingsButton).toBeInViewport({ timeout: 15000 });
    try {
      exist
        ? await expect(
            this.page.locator("p").getByText(listingName, { exact: true })
          ).toBeInViewport({
            timeout: 10000,
          })
        : expect(this.page.getByText(listingName, { exact: true })).toBeHidden({
            timeout: 10000,
          });
    } catch (error) {
      await this.hideListingsButton.click();
      await this.hideListingsButton.click();
      exist
        ? await expect(
            this.page.locator("p").getByText(listingName, { exact: true })
          ).toBeInViewport({
            timeout: 10000,
          })
        : expect(this.page.getByText(listingName, { exact: true })).toBeHidden({
            timeout: 10000,
          });
    }
  }

  async auctionNextSpot() {
    await this.auctionNextSpotButton.click();
  }

  async tapBuyersList() {
    await this.buyerTab.click();
  }

  async assertBuyersInfo(buyersInfo: string) {
    try {
      await expect(this.page.getByText(buyersInfo)).toBeInViewport({
        timeout: 10000,
      });
    } catch (error) {
      await this.clickRefresh();
      await expect(this.page.getByText(buyersInfo)).toBeInViewport({
        timeout: 10000,
      });
    }
    // await expect(this.page.getByText(buyersInfo)).toBeInViewport({
    //   timeout: 15000,
    // });
  }

  async downloadCSV() {
    await this.downloadCSVButton.click();
  }

  async assignSpot(username: string) {
    // default the first spot
    const spot = '[data-testid="virtuoso-item-list"] > div:nth-child(3)';
    await this.page
      .locator(spot)
      .getByRole("button")
      .last()
      .click({ timeout: 5000 });
    await this.assignUserButton.click({ timeout: 5000 });
    await this.inputUsernameField.fill(username);
    await this.page.waitForTimeout(1000);
    await this.saveAssignButton.click();
    await this.page.waitForTimeout(3000);
    return await this.page.locator(spot).innerText();
  }

  async clickRefresh() {
    // await this.refreshButton.click();
  }

  async refreshPage() {
    await this.page.reload();
    await this.defaultCameraSet();
  }

  async unassginSpot() {
    const spot = '[data-testid="virtuoso-item-list"] > div:nth-child(3)';
    await this.page.locator(spot).getByRole("button").last().click();
    await this.unassignButton.click();
    await expect(this.page.getByText("0/30 sold")).toBeInViewport({
      timeout: 10000,
    });
    // try {
    //   await this.tapBuyersList();
    //   await expect(this.page.getByText("No buyers yet!")).toBeInViewport({
    //     timeout: 10000,
    //   });
    // } catch (error) {
    //   await this.clickRefresh();
    //   await this.tapBuyersList();
    //   await expect(this.page.getByText("No buyers yet!")).toBeInViewport({
    //     timeout: 10000,
    //   });
    // }
  }

  async tapSpotsSoldList() {
    await this.spotsSoldTab.click();
  }

  async assertPaymentFailed(waittingTime: number = 90000) {
    await expect(this.checkoutFailed).toBeInViewport({ timeout: waittingTime });
    // await expect(this.paymentFailure).toBeInViewport({ timeout: 60000 });
  }

  async assertSpotRemoveFromSoldList(spotName: string) {
    await expect(this.page.getByText(spotName)).toBeHidden({ timeout: 50000 });
  }

  async tapAllSpotsList() {
    await this.allspotsTab.click();
  }

  async assertSpotAvailable(spotName: string) {
    await this.tapAllSpotsList();
    await expect(this.page.getByText(spotName)).toBeInViewport({
      timeout: 50000,
    });
  }

  async randomizeSpots() {
    // try {
    //   await expect(this.randomizeSpotsButton).toBeInViewport({
    //     timeout: 10000,
    //   });
    // } catch (error) {
    //   await this.liveInteractionsButton.click();
    // }
    await this.randomizeSpotsButton.click();
    await expect(this.endUnboxingButton).toBeInViewport({
      timeout: 20000,
    });
  }

  async assertRandomizeSuccess(spotsNames: string[]) {
    for (const spotName of spotsNames) {
      expect(this.page.getByText(spotName)).toBeDefined();
    }
  }

  async runAuction() {
    await this.auctionNextSpotButton.click({ timeout: 15000 });
  }

  async runAuctionAtlantaHawks() {
    // await expect(this.auctionAtlantaHawks).toBeEnabled({ timeout: 5000 });
    await this.auctionAtlantaHawks.click();
  }

  async changeBreakStatus(
    from: "Coming up" | "Now breaking" | "Ended",
    to: "Coming up" | "Now breaking" | "Ended"
  ) {
    await this.page
      .getByRole("button", { name: from })
      .click({ timeout: 5000 });
    switch (to) {
      case "Coming up":
        await this.optionComingUp.click({ timeout: 3000 });
        await expect(this.page.getByLabel(to)).toBeInViewport({
          timeout: 3000,
        });
        break;
      case "Now breaking":
        await this.optionNowBreaking.click({ timeout: 3000 });
        break;
      case "Ended":
        await this.optionEnded.click({ timeout: 3000 });
        await expect(
          this.page.getByText("Are you sure you want to complete this break?")
        ).toBeInViewport({
          timeout: 3000,
        });
        await this.imSure.check();
        expect(await this.imSure.isChecked()).toBeTruthy();
        await this.endedBreakButton.click();
        break;
    }
  }

  async changeSpotPrice(price: string) {
    await this.firstSpotInList.locator("svg").click();
    await this.editPriceButton.click();
    await this.editPriceTextArea.fill(price);
    await this.savePriceButton.click();
    await this.page.waitForTimeout(3000);
    // expect(
    //   (await this.firstSpotPrice.innerText()) ==
    //     `$${parseFloat(price).toFixed(2)}`
    // );
    expect((await this.firstSpotPrice.innerText()) == `$${parseFloat(price)}`);
  }

  async createGames(listingName: string, gametitle: string) {
    try {
      await expect(this.gamesButton).toBeInViewport({
        timeout: 10000,
      });
    } catch (error) {
      await this.liveInteractionsButton.click();
    }
    await this.gamesButton.click();
    await expect(this.gameLaunchButton).toBeInViewport({
      timeout: 3000,
    });
    await this.selectABreak.click();
    await this.page.getByLabel(listingName).click();
    await this.giveawayCheckbox.check();
    await this.gameTitle.fill(gametitle);
    let i = 15;
    while (i > 5) {
      await this.minusButton.click();
      i--;
    }
    await expect(this.page.getByText("5:00")).toBeInViewport({ timeout: 3000 });
    await this.gameLaunchButton.click();
  }

  async launchGameGiveaway() {
    await this.gameLaunchGiveawayButton.click({ timeout: 240000 });
  }

  async startUnboxing() {
    await this.startUnboxingButton.click({ timeout: 240000 });
  }

  async assertWonGameGiveaway(username: string, gameTitle: string) {
    const text = username + " won giveaway " + gameTitle;
    await expect(this.page.getByText(text)).toBeInViewport({ timeout: 30000 });
  }

  async clickOverlays() {
    await this.overlaysButton.click();
  }

  async clickFire() {
    await this.fireButton.click();
    await this.page.waitForTimeout(3000);
  }

  async clickToTheMoon() {
    await this.toTheMoonButton.click();
    await this.page.waitForTimeout(3000);
  }

  async clickConfetti() {
    await this.confettiButton.click();
    await this.page.waitForTimeout(3000);
  }

  async closeOverlays() {
    await this.closeOverlaysButton.click();
  }
}
