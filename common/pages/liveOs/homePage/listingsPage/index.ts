import { type Locator, type Page } from "@playwright/test";

export class ListingsPage {
  readonly page: Page;
  readonly listingTitle: Locator;
  readonly listingName: Locator;
  readonly listingNameEdit: Locator;
  readonly random: Locator;
  readonly pickYourSpot: Locator;
  readonly setPrice: Locator;
  readonly auction: Locator;
  readonly saveListing: Locator;
  readonly publishShowButton: Locator;
  readonly saveShowAsUnpublished: Locator;
  readonly pricePerSpot: Locator;
  readonly pricePerSpotEdit: Locator;
  readonly assignPrices: Locator;
  readonly miniBid: Locator;
  readonly miniBidEdit: Locator;
  readonly breakExtras: Locator;
  readonly stashOrPass: Locator;
  readonly stashOrPassEdit: Locator;
  readonly pick2Choose1: Locator;
  readonly pick2Choose1Edit: Locator;
  readonly nonePick: Locator;
  readonly nonePickEdit: Locator;
  readonly minRequired: Locator;
  readonly minRequiredEdit: Locator;
  readonly extendedBidding: Locator;
  readonly extendedBiddingEdit: Locator;
  readonly saveExtras: Locator;
  readonly editDetailsButton: Locator;
  readonly listingItem: Locator;
  readonly editingMark: Locator;
  readonly saveChangesbutton: Locator;
  readonly search: Locator;
  readonly inputSearchField: Locator;
  readonly inputProductField: Locator;
  readonly saveAddProductButton: Locator;
  readonly closeSearchModalButton: Locator;
  readonly defaultCost: Locator;
  readonly assignPricesSubmitButton: Locator;
  readonly date: Locator;
  readonly time: Locator;
  readonly showName: Locator;
  readonly shippingProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listingTitle = page.getByLabel("Title");
    this.listingName = page.locator("#create-listing-form_break_template_id");
    this.listingNameEdit = page.locator("#edit-listing-form_break_template_id");
    this.random = page.getByText("Random", { exact: true });
    this.pickYourSpot = page.getByText("Pick your spot", { exact: true });
    this.setPrice = page.getByText("Set price", { exact: true });
    this.auction = page.getByText("Auction", { exact: true });
    this.saveListing = page.getByRole("button", {
      name: "Save listing and add another",
    });
    this.publishShowButton = page.getByRole("button", { name: "Publish show" });
    this.saveShowAsUnpublished = page.getByRole("button", {
      name: "Save show as unpublished",
    });
    this.pricePerSpot = page.locator("#create-listing-form_price_in_cents");
    this.pricePerSpotEdit = page.locator("#edit-listing-form_price_in_cents");

    this.assignPrices = page.locator(
      '[data-test-id="toggle-spot-pricing-modal-button"]'
    );
    this.miniBid = page.locator("#create-listing-form_minimum_bid_in_cents");
    this.miniBidEdit = page.locator("#edit-listing-form_minimum_bid_in_cents");

    this.breakExtras = page.locator("span").filter({ hasText: "Break extras" });

    this.minRequired = page.locator(
      "#create-listing-form_break_mechanic_threshold_in_cents"
    );
    this.minRequiredEdit = page.locator(
      "#edit-listing-form_break_mechanic_threshold_in_cents"
    );
    this.extendedBidding = page.locator(
      "#create-listing-form_extended_bidding_enabled"
    );
    this.extendedBiddingEdit = page.locator(
      "#edit-listing-form_extended_bidding_enabled"
    );
    this.saveExtras = page.getByRole("button", { name: "Save", exact: true });
    this.editDetailsButton = page.locator(
      '[data-test-id="edit-live-stream-button"]'
    );
    this.stashOrPass = this.page.locator(
      "#create-listing-form_break_mechanic_type_stash_or_pass"
    );
    this.stashOrPassEdit = this.page.locator(
      "#edit-listing-form_break_mechanic_type_stash_or_pass"
    );
    this.pick2Choose1 = this.page.locator(
      "#create-listing-form_break_mechanic_type_pick_2_choose_1"
    );
    this.pick2Choose1Edit = this.page.locator(
      "#edit-listing-form_break_mechanic_type_pick_2_choose_1"
    );
    this.nonePick = this.page.locator(
      "#create - listing - form_break_mechanic_type_"
    );
    this.nonePickEdit = this.page.locator(
      "#edit - listing - form_break_mechanic_type_"
    );

    this.listingItem = page.locator("aside > div").last().locator("> div");
    this.editingMark = page.getByText("Editing");
    this.saveChangesbutton = page.getByRole("button", {
      name: "Save changes",
    });
    this.search = page.locator(
      '[data-test-id="toggle-product-search-modal-button"]'
    );
    this.inputSearchField = page.getByPlaceholder("Search");
    this.inputProductField = page.getByPlaceholder("Product name");
    this.saveAddProductButton = page.getByText("Save & add");
    this.closeSearchModalButton = page.locator(
      '[data-test-id="close-product-search-modal"]'
    );
    this.defaultCost = page.getByPlaceholder("$0.00");
    this.assignPricesSubmitButton = page.locator(
      '[data-test-id="assign-prices-button"]'
    );
    this.date = page.locator("h3").locator("#starts_at_date");
    this.time = page.locator("h3").locator("#starts_at_time");
    this.showName = page.locator(".stream-card-preview.card > h3");
    this.shippingProfile = page.locator(
      "#create-listing-form_shipping_profile_id"
    );
  }
}
