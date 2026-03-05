import { expect } from "@playwright/test";
import { ScheduleDetails } from "@/steps/liveOS/homePage/schedulePage";
import moment from "moment";
import {
  BaseListings,
  BreaksListings,
  Listing,
  ProductType,
} from "@/params/listingsParams";
import { ListingsPage } from "@/pages/liveOs/homePage/listingsPage";

export class ListingsSteps extends ListingsPage {
  async inputListingTitle(listingTitle: string) {
    await this.listingTitle.fill(listingTitle);
  }

  async selectListing(listingName: string) {
    await this.listingName.selectOption(listingName);
  }

  async editSelectListing(listingName: string) {
    await this.listingNameEdit.selectOption(listingName);
  }

  async selectRandom() {
    await this.random.click();
  }

  async selectPickYourSpot() {
    await this.pickYourSpot.click();
  }

  async selectSetPrice() {
    await this.setPrice.click();
  }
  async selectAuction() {
    await this.auction.click();
  }

  async inputPricePerSpot(pricePerSpot: string) {
    await this.pricePerSpot.fill(pricePerSpot);
  }

  async clickAssignPrice() {
    await this.assignPrices.click();
  }

  async inputAssignPrices(assignPrices: string) {
    var i = 0;
    for (; i < 30; ) {
      await this.page
        .locator(`[data-test-id="price_input_${i}"]`)
        .fill(assignPrices);
      i++;
    }
  }

  async submitAssignPrices() {
    await expect(this.assignPricesSubmitButton).toBeEnabled({
      timeout: 3000,
    });
    await this.assignPricesSubmitButton.click();
  }

  async inputMinBid(minbid: string) {
    await this.miniBid.fill(minbid);
  }

  async editMinBid(minbid: string) {
    await this.miniBidEdit.fill(minbid);
  }

  async clickBreakExtras() {
    await this.breakExtras.click();
  }

  async selectExtendedBidding() {
    await this.extendedBidding.check();
  }

  async editExtendedBidding() {
    await this.extendedBiddingEdit.check();
  }

  async selectStashOrPass() {
    await this.stashOrPass.check();
  }

  async editToStashOrPass() {
    await this.stashOrPassEdit.check();
  }

  async selectPick2Choose1() {
    await this.pick2Choose1.check();
  }

  async editToPick2Choose1() {
    await this.pick2Choose1Edit.check();
  }

  async selectNone() {
    await this.nonePick.check();
  }

  async EditToNone() {
    await this.nonePickEdit.check();
  }

  async inputMinRequired(miniRequired: string) {
    await this.minRequired.fill(miniRequired);
  }

  async editMinRequired(miniRequired: string) {
    await this.minRequiredEdit.fill(miniRequired);
  }

  async saveBreakExtras() {
    await this.saveExtras.click();
  }

  async scheduleThisShow() {
    await this.page.waitForTimeout(3000);
    await this.publishShowButton.click();
  }

  async saveAsDraft() {
    await this.saveShowAsUnpublished.click();
    await this.page.waitForTimeout(3000);
  }

  async editDetails() {
    await this.editDetailsButton.click();
  }

  async editListing(position: number) {
    await this.listingItem
      .nth(position)
      .getByRole("button", { name: "Edit" })
      .click();
    await expect(this.editingMark).toBeVisible({ timeout: 3000 });
  }

  async clickAddProductsToYourListing() {
    await this.search.click();
  }

  async searchProduct(productName: string) {
    await this.inputSearchField.fill(productName);
  }

  async inputProduct(productName: string) {
    await this.inputProductField.fill(productName);
  }

  async selectFirstProduct() {
    await this.page.locator(".modal-content > div > ul > li").nth(0).click();
  }

  async selectMutipleProducts(productsCounts: number) {
    await this.page.waitForTimeout(1000);
    for (var i = 0; i < productsCounts; ) {
      await this.page
        .locator("li")
        .nth(i * 2)
        .click();
      i++;
      await this.page.waitForTimeout(1000);
    }
  }

  async saveProduct() {
    await this.saveAddProductButton.click();
  }

  async closeSearchModal() {
    await this.closeSearchModalButton.click();
  }

  async inputCost(cost: string) {
    await this.defaultCost.fill(cost);
  }
  async commonBegin(listing: Listing, isCreate: boolean) {
    await this.listingTitle.fill(listing.listingTitle);
    isCreate
      ? await this.listingName.selectOption(listing.listingName)
      : await this.listingNameEdit.selectOption(listing.listingName);
  }

  async inputTitleAndSelectListing(listing: Listing) {
    await this.inputListingTitle(listing.listingTitle);
    await this.selectListing(listing.listingName);
  }

  async editTitleAndSelectListing(listing: Listing) {
    await this.inputListingTitle(listing.listingTitle);
    await this.editSelectListing(listing.listingName);
  }

  async saveNewListing() {
    await this.saveListing.click();
    await this.page.waitForTimeout(1000);
  }

  async addShippingProfile(option: string = "chirstine shetler") {
    await this.shippingProfile.selectOption(option);
  }

  async commonFinishListing(listing: Listing) {
    await this.commonAddProduct(listing);
    // await this.addShippingProfile();
    await this.saveNewListing();
  }

  async editListingSave() {
    await this.saveChangesbutton.click();
    await this.page.waitForTimeout(1000);
  }

  // async commonFinish(isCreate: boolean = true) {
  //   await this.commonAddProduct();
  //   isCreate
  //     ? await this.saveListing.click()
  //     : await this.saveChangesbutton.click();
  //   await this.page.waitForTimeout(1000);
  // }

  // async commonAddProduct() {
  //   await this.clickAddProductsToYourListing();
  //   await this.searchProduct("NBA");
  //   await this.inputProduct("NBA");
  //   await this.saveProduct();
  //   await this.closeSearchModal();
  //   await this.inputCost("111");
  //   await this.page.waitForTimeout(1000);
  // }

  async commonAddProduct(listing: Listing) {
    await this.clickAddProductsToYourListing();
    await this.searchProduct(listing.product?.name || "NBA");
    await this.selectFirstProduct();
    await this.closeSearchModal();
    await this.inputCost(listing.product?.cost || "100");
    await this.page.waitForTimeout(1000);
  }

  async addMultipleProduct(count: number) {
    // random products
    await this.clickAddProductsToYourListing();
    await this.searchProduct("NBA");
    await this.selectMutipleProducts(count);
    await this.closeSearchModal();
    for (var index = 0; index < count; ) {
      let costArea = `#create-listing-form_break_products_${index}_cost_in_cents`;
      await this.page.locator(costArea).fill("100");
      index++;
    }
  }

  async saveAndAssertAddListing(listing: Listing, success?: boolean) {
    await this.saveNewListing();
    success
      ? await this.assertListingAddSuccess(listing)
      : await this.assertListingAddFailed();
  }

  async addNewProduct(listing: Listing) {
    await this.clickAddProductsToYourListing();
    await this.searchProduct(listing.product?.name || "ThisIsATest");
    await this.page
      .locator("#new_product_year")
      .selectOption(listing.product?.newProduct?.year || "2023");
    await this.page
      .locator("#new_product_manufacturer")
      .selectOption(listing.product?.newProduct?.manufacturer || "Other");
    await this.page
      .locator("#new_product_league")
      .selectOption(listing.product?.newProduct?.league || "NBA");
    await this.inputProduct(
      listing.product?.newProduct?.newName || "autotestProduct"
    );
    await this.saveProduct();
    await this.page.getByLabel("Yes, I'm sure.").check();
    await this.page
      .locator('[data-test-id="product-search-modal"]')
      .getByText("Add Product")
      .click();
    await this.inputCost(listing.product?.cost || "100");
    await this.page.waitForTimeout(1000);
    expect(this.page.getByRole("heading", { name: listing.listingTitle }));
  }

  async deleteProduct(count?: number) {
    await this.page.waitForTimeout(3000);
    for (var index = count || 3; index > 0; ) {
      await this.page
        .locator("li")
        .locator('[data-test-id="remove-stock-from-break"]')
        .nth(index - 1)
        .click();
      index--;
    }
    await this.page.waitForTimeout(1000);
  }

  async addRandomSetPrice(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.page.waitForTimeout(1000);
    await this.selectRandom();
    await this.page.waitForTimeout(1000);
    await this.selectSetPrice();
    await this.page.waitForTimeout(1000);
    listing.pricePerSpot &&
      (await this.inputPricePerSpot(listing.pricePerSpot));
    await this.page.waitForTimeout(1000);
    await this.commonFinishListing(listing);
  }

  async addRandomSetPriceWithMutipleProducts(listing: Listing, count?: number) {
    await this.inputTitleAndSelectListing(listing);
    await this.page.waitForTimeout(1000);

    await this.selectRandom();
    await this.page.waitForTimeout(1000);

    await this.selectSetPrice();
    await this.page.waitForTimeout(1000);
    listing.pricePerSpot &&
      (await this.inputPricePerSpot(listing.pricePerSpot));
    await this.page.waitForTimeout(1000);
    await this.addMultipleProduct(count || 3);
  }

  async changeToRandomSetPrice(listing: Listing) {
    await this.editTitleAndSelectListing(listing);
    await this.selectRandom();
    await this.selectSetPrice();
    await this.page.waitForTimeout(1000);
    listing.pricePerSpot &&
      (await this.inputPricePerSpot(listing.pricePerSpot));
    await this.commonAddProduct(listing);
    await this.editListingSave();
  }

  async addRandomAuction(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.page.waitForTimeout(1000);

    await this.selectRandom();
    await this.page.waitForTimeout(1000);

    await this.selectAuction();
    if (listing.breakExtras) {
      await this.clickBreakExtras();
      await this.page.waitForTimeout(1000);

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
      await this.page.waitForTimeout(1000);
      listing.breakExtras?.extendedBidding !== undefined &&
        (await this.selectExtendedBidding());
      await this.page.waitForTimeout(1000);
      await this.saveBreakExtras();
    }
    await this.page.waitForTimeout(1000);
    listing.minbid && (await this.inputMinBid(listing.minbid));
    await this.page.waitForTimeout(1000);
    await this.commonFinishListing(listing);
  }
  async changeToRandomAuction(listing: Listing) {
    await this.editTitleAndSelectListing(listing);
    await this.selectRandom();
    await this.selectAuction();
    if (listing.breakExtras) {
      await this.clickBreakExtras();
      switch (listing.breakExtras.extrasType?.extrasType) {
        case "stashOrPass":
          await this.editStashOrPass(
            listing.breakExtras.extrasType.miniRequired
          );
          break;
        case "pick2Choose1":
          await this.editPick2Choose1(
            listing.breakExtras.extrasType.miniRequired
          );
          break;
        case "None":
          await this.EditToNone();
          break;
      }
      listing.breakExtras?.extendedBidding !== undefined &&
        (await this.editExtendedBidding());
      await this.saveBreakExtras();
    }
    listing.minbid && (await this.editMinBid(listing.minbid));
    await this.page.waitForTimeout(1000);
    // await this.commonAddProduct();
    await this.editListingSave();
  }

  async addPickYourSpotSetPrice(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.page.waitForTimeout(1000);
    await this.selectPickYourSpot();
    await this.page.waitForTimeout(1000);
    await this.selectSetPrice();
    await this.page.waitForTimeout(1000);
    await this.clickAssignPrice();
    await this.page.waitForTimeout(1000);
    listing.assignPrices &&
      (await this.inputAssignPrices(listing.assignPrices));
    await this.page.waitForTimeout(1000);
    await this.submitAssignPrices();
    await this.page.waitForTimeout(1000);
    await this.commonFinishListing(listing);
  }

  async changeToPickYourSpotSetPrice(listing: Listing) {
    await this.editTitleAndSelectListing(listing);
    await this.selectPickYourSpot();
    await this.selectSetPrice();
    await this.clickAssignPrice();
    listing.assignPrices &&
      (await this.inputAssignPrices(listing.assignPrices));
    await this.submitAssignPrices();
    await this.page.waitForTimeout(1000);
    // await this.commonAddProduct();
    await this.editListingSave();
  }

  async addPickYourSpotAuction(listing: Listing) {
    await this.inputTitleAndSelectListing(listing);
    await this.page.waitForTimeout(1000);
    await this.selectPickYourSpot();
    await this.page.waitForTimeout(1000);
    await this.selectAuction();
    if (listing.breakExtras?.extendedBidding !== undefined) {
      await this.page.waitForTimeout(1000);
      await this.clickBreakExtras();
      await this.page.waitForTimeout(1000);
      await this.selectExtendedBidding();
      await this.page.waitForTimeout(1000);
      await this.saveBreakExtras();
    }
    await this.page.waitForTimeout(1000);
    listing.minbid && (await this.inputMinBid(listing.minbid));
    await this.page.waitForTimeout(1000);
    await this.commonFinishListing(listing);
  }

  async changeToPickYourSpotAuction(listing: Listing) {
    await this.editTitleAndSelectListing(listing);
    await this.selectPickYourSpot();
    await this.selectAuction();
    if (listing.breakExtras?.extendedBidding !== undefined) {
      await this.clickBreakExtras();
      await this.editExtendedBidding();
      await this.page.waitForTimeout(1000);
      await this.saveBreakExtras();
    }
    listing.minbid && (await this.editMinBid(listing.minbid));
    // await this.commonAddProduct();
    await this.editListingSave();
  }
  // async addPickYourSpotAuction(listing: Listing, isCreate: boolean = true) {
  //   await this.commonBegin(listing, isCreate);
  //   await this.pickYourSpot.click();
  //   await this.auction.click();
  //   if (listing.breakExtras?.extendedBidding !== undefined) {
  //     await this.breakExtras.click();
  //     isCreate
  //       ? await this.extendedBidding.check()
  //       : await this.extendedBiddingEdit.check();
  //     await this.page.waitForTimeout(1000);
  //     await this.saveExtras.click();
  //   }
  //   listing.minbid &&
  //     (isCreate
  //       ? await this.miniBid.fill(listing.minbid)
  //       : await this.miniBidEdit.fill(listing.minbid));
  //   await this.commonFinish(isCreate);
  // }

  async setStashOrPass(miniRequired: string) {
    await this.selectStashOrPass();
    await this.inputMinRequired(miniRequired);
  }
  async editStashOrPass(miniRequired: string) {
    await this.editToStashOrPass();
    await this.editMinRequired(miniRequired);
  }
  async setPick2Choose1(miniRequired: string) {
    await this.selectPick2Choose1();
    await this.inputMinRequired(miniRequired);
  }
  async editPick2Choose1(miniRequired: string) {
    await this.editToPick2Choose1();
    await this.editMinRequired(miniRequired);
  }

  async assertDetailsChanges(details: ScheduleDetails) {
    const { time, date, showName } = details;
    const formattedTime = moment(time, "HH:mm").format("h:mm A");
    const formattedDate = moment(date).format("MMMM D YYYY");
    await expect(this.date).toHaveText(formattedDate);
    await expect(this.time).toHaveText(formattedTime);
    await expect(this.showName).toHaveText(showName);
  }

  async asssertPageLoaded() {
    try {
      await expect(this.date).not.toBeEmpty({
        timeout: 10000,
      });
    } catch (error) {
      this.page.reload();
      await expect(this.date).not.toBeEmpty({
        timeout: 10000,
      });
    }
  }

  async addListings(Listings: BreaksListings | BaseListings) {
    let listingsCount = 0;
    for (const listing of Listings.randomAuction) {
      await this.addRandomAuction(listing.origin);
      listingsCount += 1;
    }
    for (const listing of Listings.randomSetPrice) {
      await this.addRandomSetPrice(listing.origin);
      listingsCount += 1;
    }
    for (const listing of Listings.pickYourSpotAuction) {
      await this.addPickYourSpotAuction(listing.origin);
      listingsCount += 1;
    }
    for (const listing of Listings.pickYourSpotSetPrice) {
      await this.addPickYourSpotSetPrice(listing.origin);
      listingsCount += 1;
    }
    return listingsCount;
  }

  async changeListing(Listings: BreaksListings) {
    let listingsCount = 0;
    for (const listing of Listings.randomAuction) {
      await this.addRandomAuction(listing.origin);
      await this.editListing(listingsCount);
      await this.changeToRandomAuction(listing.changeTo);
      listingsCount += 1;
    }
    for (const listing of Listings.randomSetPrice) {
      await this.addRandomSetPrice(listing.origin);
      await this.editListing(listingsCount);
      await this.changeToRandomSetPrice(listing.changeTo);
      listingsCount += 1;
    }
    for (const listing of Listings.pickYourSpotAuction) {
      await this.addPickYourSpotAuction(listing.origin);
      await this.editListing(listingsCount);
      await this.changeToPickYourSpotAuction(listing.changeTo);
      listingsCount += 1;
    }
    for (const listing of Listings.pickYourSpotSetPrice) {
      await this.addPickYourSpotSetPrice(listing.origin);
      await this.editListing(listingsCount);
      await this.changeToPickYourSpotSetPrice(listing.changeTo);
      listingsCount += 1;
    }
  }

  async assertListingAddSuccess(listing: Listing) {
    await expect(
      this.page.getByRole("heading", { name: listing.listingTitle })
    ).toBeInViewport({ timeout: 5000 });
  }

  async assertListingAddFailed() {
    await expect(
      this.page.getByText("* Add products to continue")
    ).toBeInViewport({ timeout: 5000 });
  }

  async addListing(listing: Listing) {
    listing.assignments == "pickYourSpot" &&
      listing.sellType == "auction" &&
      (await this.addPickYourSpotAuction(listing));
    listing.assignments == "pickYourSpot" &&
      listing.sellType == "set price" &&
      (await this.addPickYourSpotSetPrice(listing));
    listing.assignments == "random" &&
      listing.sellType == "auction" &&
      (await this.addRandomAuction(listing));
    listing.assignments == "random" &&
      listing.sellType == "set price" &&
      (await this.addRandomSetPrice(listing));
  }
}
