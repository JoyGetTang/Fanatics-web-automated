import { type Locator, type Page } from "@playwright/test";

export class SchedulePage {
  readonly page: Page;
  readonly showTitle: Locator;
  readonly coverImage: Locator;
  readonly date: Locator;
  readonly time: Locator;
  readonly channel: Locator;
  readonly descirption: Locator;
  readonly breakerOne: Locator;
  readonly breakerTwo: Locator;
  readonly addListings: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.showTitle = page.getByPlaceholder("Keep it short and sweet");
    this.coverImage = page.locator("input#cover_image_upload");
    this.date = page.locator("#startsAtDate");
    this.time = page.locator("#startsAtTime");
    this.channel = page.locator("#live_stream-form_channel_id");
    this.descirption = page.getByPlaceholder("Description");
    this.breakerOne = page.locator("#live_stream-form_staffers_0_id");
    this.breakerTwo = page.locator("#live_stream-form_staffers_1_id");
    this.addListings = page.getByRole("button", {
      name: "Add listings",
      exact: true,
    });
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
  }
}
