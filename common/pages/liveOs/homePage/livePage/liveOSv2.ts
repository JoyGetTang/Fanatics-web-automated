import { type Locator, type Page } from "@playwright/test";

export class LivePageV2 {
  readonly page: Page;
  readonly goLiveButton: Locator;
  readonly endShowButton: Locator;
  readonly takeControlButton: Locator;
  readonly doItNowButton: Locator;
  readonly cancelButton: Locator;
  readonly imSure: Locator;
  readonly listingItems: Locator;
  readonly endStreamButton: Locator;
  readonly giveawayButton: Locator;
  readonly giveawayFormTitle: Locator;
  readonly giveawayFormAllViewers: Locator;
  readonly giveawayFormFollowersOnly: Locator;
  readonly giveawayFormUploadCSV: Locator;
  readonly giveawayLaunchButton: Locator;
  readonly giveawayTimer: Locator;
  readonly oneUpAuction: Locator;
  readonly auctionFormTitle: Locator;
  readonly auctionStartingBid: Locator;
  readonly extendingBidding: Locator;
  readonly runAuctionButton: Locator;
  readonly oneUpAuctionTimer: Locator;
  readonly auctionFailed: Locator;
  readonly pollFormCreate: Locator;
  readonly pollFormTitle: Locator;
  readonly pollFormOptions: Locator;
  readonly pollFormAddOption: Locator;
  readonly pollFormDeleteOption: Locator;
  readonly pollFormDuration: Locator;
  readonly pollFormPublish: Locator;
  readonly endPollButton: Locator;
  readonly viewPollResultsTab: Locator;
  readonly createPollTab: Locator;
  readonly viewPollResult: Locator;
  readonly hasBeingTakenControlBySomeone: Locator;
  readonly streamControlsButton: Locator;
  readonly editStreamControlsButton: Locator;
  readonly productCameraOption: Locator;
  readonly talentCameraOption: Locator;
  readonly securityCameraOption: Locator;
  readonly audioSourceOption: Locator;
  readonly saveStreamControlsButton: Locator;
  readonly overlaysButton: Locator;
  readonly fireButton: Locator;
  readonly toTheMoonButton: Locator;
  readonly confettiButton: Locator;
  readonly closeOverlaysButton: Locator;
  readonly increaseGiveawayMinutesButton: Locator;
  readonly decreaseGiveawayMinutesButton: Locator;
  readonly close1UpModal: Locator;
  readonly closeGiveawayModal: Locator;
  readonly allChatTap: Locator;
  readonly questionsTap: Locator;
  readonly winnerTap: Locator;
  readonly hideListingsButton: Locator;
  readonly addListingsButton: Locator;
  readonly traditionalListingButton: Locator;
  readonly closeAddListingsModalButton: Locator;
  readonly addListingNameField: Locator;
  readonly searchYourInventoryButton: Locator;
  readonly closeAddItemsModal: Locator;
  readonly inputSearchItemField: Locator;
  readonly selectSpotListOptions: Locator;
  readonly allSpotsListingTab: Locator;
  readonly endedSpotsListingTab: Locator;
  readonly allspotsTab: Locator;
  readonly spotsLeftTab: Locator;
  readonly spotsSoldTab: Locator;
  readonly buyerTab: Locator;
  readonly firstItem: Locator;
  readonly firstItemCost: Locator;
  readonly pickYour: Locator;
  readonly random: Locator;
  readonly fixedPrice: Locator;
  readonly auction: Locator;
  readonly minimumBid: Locator;
  readonly saveListingButton: Locator;
  readonly auctionSettingButton: Locator;
  readonly randomSetPriceInCents: Locator;
  readonly extendedBidding: Locator;
  readonly stashOrPass: Locator;
  readonly pick2Choose1: Locator;
  readonly nonePick: Locator;
  readonly saveBreakExtrasButton: Locator;
  readonly minRequired: Locator;
  readonly assignPricesButton: Locator;
  readonly assignPricesSubmitButton: Locator;
  readonly randomize: Locator;
  readonly typeYourMessageField: Locator;
  readonly sendMessageButton: Locator;
  readonly beginRandomizeButton: Locator;
  readonly randomizeSpotsList: Locator;
  readonly randomizeResultMessage: Locator;
  readonly inputsTap: Locator;
  readonly liveInteractionsTap: Locator;
  readonly copyBreakButton: Locator;
  readonly editNameButton: Locator;
  readonly moveToAnotherStreamButton: Locator;
  readonly upcomingLiveTap: Locator;
  readonly moveBreakButton: Locator;
  readonly auctionNextSpotButton: Locator;
  readonly auctionAtlantaHawks: Locator;
  readonly downloadCSVButton: Locator;
  readonly assignUserButton: Locator;
  readonly inputUsernameField: Locator;
  readonly saveAssignButton: Locator;
  readonly checkoutFailed: Locator;
  readonly paymentFailure: Locator;
  readonly randomizeSpotsButton: Locator;
  readonly soldOut: Locator;
  readonly markListingCompleteButton: Locator;
  readonly mediaWarning: Locator;
  readonly optionComingUp: Locator;
  readonly optionNowBreaking: Locator;
  readonly optionEnded: Locator;
  readonly endedBreakButton: Locator;
  readonly shippingProfile: Locator;
  readonly liveInteractionsButton: Locator;
  readonly refreshButton: Locator;
  readonly editPriceButton: Locator;
  readonly savePriceButton: Locator;
  readonly editPriceTextArea: Locator;
  readonly firstSpotInList: Locator;
  readonly firstSpotName: Locator;
  readonly firstSpotPrice: Locator;
  readonly deleteBreakOptionButton: Locator;
  readonly deleteBreakConfirmModal: Locator;
  readonly deleteBreakButton: Locator;
  readonly unassignButton: Locator;
  readonly gamesButton: Locator;
  readonly giveawayCheckbox: Locator;
  readonly gameTitle: Locator;
  readonly minusButton: Locator;
  readonly plusButton: Locator;
  readonly gameLaunchButton: Locator;
  readonly selectABreak: Locator;
  readonly gameLaunchGiveawayButton: Locator;
  readonly startUnboxingButton: Locator;
  readonly backToEditPageButton: Locator;
  readonly featureListingButton: Locator;
  readonly customersTab: Locator;
  readonly soldTab: Locator;
  readonly spotsTab: Locator;
  readonly endUnboxingButton: Locator;
  readonly typeSelection: Locator;
  readonly leagueSelection: Locator;
  readonly breakTypeSelection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.streamControlsButton = page
      .locator("section")
      .getByRole("button")
      .locator("svg")
      .first();
    this.goLiveButton = page.getByRole("button", { name: "Go live" });
    this.editStreamControlsButton = page.locator("button:nth-child(3)").first();
    this.productCameraOption = page.locator("#select-form-name").nth(0);
    this.talentCameraOption = page.locator("#select-form-name").nth(1);
    this.securityCameraOption = page.locator("#select-form-name").nth(2);
    this.audioSourceOption = page.locator("#select-form-name").nth(3);
    this.saveStreamControlsButton = page.getByRole("button", { name: "Save" });
    this.endShowButton = page.getByRole("button", { name: "End show" });
    this.takeControlButton = page.getByRole("button", { name: "Take control" });
    this.doItNowButton = page.getByText("Do it now").first();
    this.cancelButton = page.getByLabel("Cancel");
    this.imSure = page.getByLabel("Yes, I'm sure");
    this.listingItems = page
      .getByRole("tabpanel")
      .last()
      .locator(" > div")
      .filter({ has: page.getByRole("button") });
    this.endStreamButton = page.getByRole("button", { name: "End stream" });
    this.giveawayButton = page.getByRole("button", { name: "Giveaways" });
    this.giveawayFormTitle = page.getByRole("textbox", { name: "Title" });
    this.giveawayFormAllViewers = page.getByRole("radio", {
      name: "All viewers",
    });
    this.giveawayFormFollowersOnly = page.getByRole("radio", {
      name: "Followers only",
    });
    this.increaseGiveawayMinutesButton = page.getByRole("button").nth(2);
    this.decreaseGiveawayMinutesButton = page.getByRole("button").nth(1);
    this.giveawayFormUploadCSV = page.getByText("Upload CSV");
    this.giveawayLaunchButton = page.getByRole("button", { name: "Launch" });
    this.closeGiveawayModal = page
      .locator("div")
      .filter({ hasText: /^Launch a Giveaway$/ })
      .getByRole("button");
    this.giveawayTimer = page.locator("#timer-circle");
    this.oneUpAuction = page.getByRole("button", { name: "1-up" });
    this.auctionFormTitle = page.getByRole("textbox", { name: "Title" });
    this.auctionStartingBid = page.getByPlaceholder("$");
    this.extendingBidding = page.getByRole("switch");
    this.runAuctionButton = page.getByRole("button", { name: "Run auction" });
    this.oneUpAuctionTimer = page.locator("#timer-circle");
    this.close1UpModal = page
      .locator("div")
      .filter({ hasText: /^Run an auction$/ })
      .getByRole("button");
    this.auctionFailed = page.getByText("Bid failed", { exact: true });

    this.pollFormCreate = page.getByRole("button", { name: "Polls" });
    this.pollFormTitle = page.getByLabel("TitleAllow multiple choice");
    this.pollFormOptions = page.getByPlaceholder("Option");
    this.pollFormAddOption = page.getByRole("button", { name: "Add option" });
    this.pollFormDeleteOption = page
      .getByLabel("Create a poll")
      .getByRole("button");
    this.pollFormDuration = page.getByLabel("Poll duration");
    this.pollFormPublish = page.getByRole("button", { name: "Publish poll" });
    this.endPollButton = page.getByRole("button", { name: "End poll" });
    this.viewPollResultsTab = page.getByRole("tab", { name: "View results" });
    this.createPollTab = page.getByRole("tab", { name: "Create a poll" });
    this.viewPollResult = page.getByText("View results ↓");

    this.hasBeingTakenControlBySomeone = page.getByText(`
        This stream is live somewhere else. You can take over the stream by clicking the "Take over stream" button, but
        this will eject the current streamer.
      `);
    this.overlaysButton = page.getByRole("button", { name: "Overlays" });
    this.fireButton = page.getByRole("button", { name: "Fire" });
    this.toTheMoonButton = page.getByRole("button", { name: "To the moon" });
    this.confettiButton = page.getByRole("button", { name: "Confetti" });
    this.closeOverlaysButton = page
      .locator("div")
      .filter({ hasText: /^Screen overlays$/ })
      .getByRole("button");
    this.allChatTap = page.getByRole("tab", { name: "All chat" });
    this.questionsTap = page.getByRole("tab", { name: "Questions" });
    this.winnerTap = page.getByRole("tab", { name: "Winners" });
    this.hideListingsButton = page
      .locator("div")
      .filter({ hasText: /^Listings / })
      .first()
      .getByRole("button")
      .first();
    this.addListingsButton = page
      .locator(".absolute > div > div > .flex > button")
      .first();
    this.closeAddListingsModalButton = page
      .locator("div")
      .filter({ hasText: /^Add a listing/ })
      .getByRole("button")
      .first();
    this.addListingNameField = page.getByLabel("Listing name");
    this.searchYourInventoryButton = page.getByText("Search products");
    this.closeAddItemsModal = page
      .locator("div")
      .filter({ hasText: /^Add items$/ })
      .getByRole("button");
    this.inputSearchItemField = page.getByLabel(
      "Search for items then click to add them to this break"
    );
    this.firstItem = page.locator(".relative > div > .rt-reset").first();
    this.firstItemCost = page.locator(
      'input[name="breakProductsConfig\\.0\\.costInCents"]'
    );
    this.selectSpotListOptions = page.locator("#select-form-breakTemplateId");
    this.allSpotsListingTab = page
      .getByRole("tab", { name: "All spots" })
      .last();
    this.endedSpotsListingTab = page.getByRole("tab", { name: "Ended" });
    this.allspotsTab = page.getByRole("tab", {
      name: "All spots",
      exact: true,
    });
    this.spotsLeftTab = page.getByRole("tab", { name: "spots left" });
    this.spotsSoldTab = page.getByRole("tab", { name: "spots sold" });
    this.buyerTab = page.getByRole("tab", { name: "buyers" });
    this.pickYour = page.getByRole("radio", { name: "PYT" });
    this.random = page.getByRole("radio", { name: "Random" });
    this.fixedPrice = page.getByRole("radio", { name: "Fixed price" });
    this.auction = page.getByRole("radio", { name: "Auction" });
    this.minimumBid = page.locator('input[name="minimumBidAmountInCents"]');
    this.saveListingButton = page
      .getByRole("dialog")
      .locator("form")
      .getByRole("button", { name: "Save" });
    this.auctionSettingButton = page.locator("form").getByRole("button").nth(2);
    this.randomSetPriceInCents = page.locator(
      'input[name="randomSetPriceInCents"]'
    );
    this.extendedBidding = page.getByRole("switch");
    this.stashOrPass = page.getByRole("radio", { name: "Stash or pass" });
    this.pick2Choose1 = page.getByRole("radio", { name: "Pick 2, choose 1" });
    this.nonePick = page.getByRole("radio", { name: "None" });
    this.saveBreakExtrasButton = page
      .locator("div")
      .filter({ hasText: "Break extras" })
      .getByRole("button")
      .last();
    this.minRequired = page.locator(
      'input[name="breakMechanicThresholdInCents"]'
    );
    this.assignPricesButton = page.getByRole("button", {
      name: "Assign prices",
    });

    this.assignPricesSubmitButton = page
      .getByRole("button", { name: "Save" })
      .nth(1);
    this.backToEditPageButton = page
      .locator("div")
      .filter({ hasText: /^Break extras$/ })
      .getByRole("button");
    this.randomize = page.getByRole("button", {
      name: "Randomize",
      exact: true,
    });
    this.typeYourMessageField = page.getByTestId("message-input");
    this.sendMessageButton = page.getByTestId("send-button");
    this.beginRandomizeButton = page.getByRole("button", { name: "Randomize" });
    this.randomizeSpotsList = page
      .getByLabel("Choose spots to randomize")
      .locator("option");
    this.featureListingButton = page.getByRole("menuitem", {
      name: "Feature listing",
    });
    this.randomizeResultMessage = page.getByText("was chosen").last();
    this.inputsTap = page.getByRole("tab", { name: "Inputs" });
    this.liveInteractionsTap = page.getByRole("tab", {
      name: "Live Interactions",
    });
    this.copyBreakButton = page.getByRole("menuitem", {
      name: "Copy listing",
    });
    this.editNameButton = page.getByRole("menuitem", {
      name: "Edit",
    });
    this.moveToAnotherStreamButton = page.getByRole("menuitem", {
      name: "Move to another stream",
    });
    this.upcomingLiveTap = page.getByRole("tab", { name: "Upcoming live" });
    this.moveBreakButton = page.getByRole("button", { name: "Move Break" });
    this.deleteBreakOptionButton = page.getByRole("menuitem", {
      name: "Delete listing",
    });
    this.deleteBreakConfirmModal = page.getByRole("heading", {
      name: "Delete Break",
    });
    this.deleteBreakButton = page.getByRole("button", { name: "Delete break" });
    this.auctionNextSpotButton = page.getByRole("button", {
      name: "Auction first spot",
    });
    this.auctionAtlantaHawks = page.getByRole("button", {
      name: "Auction Atlanta Hawks",
    });
    this.downloadCSVButton = page.locator(
      " .absolute  > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > button"
    );
    this.assignUserButton = page.getByRole("menuitem", {
      name: "Assign user",
    });
    this.inputUsernameField = page.getByPlaceholder("Assign user");
    this.saveAssignButton = page.getByRole("button", { name: "Assign" });
    this.checkoutFailed = page.getByText("Checkout failed", { exact: true });
    this.paymentFailure = page.getByText("Payment failure.", { exact: true });
    this.randomizeSpotsButton = page.getByRole("button", {
      name: "Start randomising ",
    });
    this.soldOut = page.getByText("SOLD OUT").first();
    this.markListingCompleteButton = page.getByRole("button", {
      name: "Mark listing complete",
    });
    this.endUnboxingButton = page.getByRole("button", { name: "End unboxing" });
    this.mediaWarning = page.getByText(
      "Please select a device configuration from the Stream controls dialog."
    );
    this.optionComingUp = page.getByRole("menuitemradio", {
      name: "Coming up",
    });
    this.optionNowBreaking = page.getByRole("menuitemradio", {
      name: "Now breaking",
    });
    this.optionEnded = page.getByRole("menuitemradio", {
      name: "Ended",
    });
    this.endedBreakButton = page.getByRole("button", { name: "Ended break" });
    this.shippingProfile = page.getByLabel("Shipping profile");
    this.liveInteractionsButton = page
      .locator("div:nth-child(3) > div ")
      .filter({ has: page.getByText("Live interactions") })
      .getByRole("button")
      .last();
    this.refreshButton = page
      .locator("section > div")
      .last()
      .locator("div > div")
      .first()
      .locator("button")
      .last();
    this.editPriceButton = page.getByRole("menuitem", {
      name: "Edit price",
    });
    this.savePriceButton = page.getByRole("button", { name: "Save" });
    this.editPriceTextArea = page.locator(
      " body > div > div > div > div > input"
    );
    this.firstSpotInList = page
      .locator("div:nth-child(2)> div:nth-child(2)> main")
      .first();
    this.firstSpotName = page
      .locator("div:nth-child(2)> div:nth-child(2)> main")
      .first()
      .locator("p")
      .first();
    this.firstSpotPrice = page
      .locator("div:nth-child(2)> div:nth-child(2)> main")
      .first()
      .locator("p")
      .last();
    this.unassignButton = page.getByRole("menuitem", { name: "Unassign" });
    this.gamesButton = page.getByRole("button", { name: "Games" });
    this.giveawayCheckbox = page.getByLabel("Giveaway");
    this.gameTitle = page.getByLabel("Title");
    this.minusButton = page.locator("form").getByRole("img").first();
    this.plusButton = page.locator("form").getByRole("img").nth(1);
    this.gameLaunchButton = page.getByRole("button", { name: "Launch" });
    this.selectABreak = page.getByRole("combobox");
    this.gameLaunchGiveawayButton = page.getByRole("button", {
      name: "Launch giveaway",
    });
    this.customersTab = page.getByRole("tab", { name: "Customers" });
    this.spotsTab = page.getByRole("tab", { name: "Spots " });
    this.soldTab = page
      .locator(".flex > .gap-2 > button")
      .filter({ has: page.getByText("Sold") });
    this.typeSelection = page.locator("#select-form-productType");
    this.leagueSelection = page.locator("#select-form-leagueId");
    this.breakTypeSelection = page.locator("#select-form-breakType");
    this.startUnboxingButton = page.getByText("Yes,Start the break");
    this.traditionalListingButton = page.getByRole("menuitem", {
      name: "Traditional Listing",
    });
  }
}
