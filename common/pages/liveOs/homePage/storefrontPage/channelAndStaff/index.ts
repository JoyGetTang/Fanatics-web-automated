import { type Locator, type Page } from "@playwright/test";

export class ChannelsAndStaff {
  readonly page: Page;
  readonly title: Locator;
  readonly logo: Locator;
  readonly submitNewChannel: Locator;
  readonly exitAddNewChannel: Locator;
  readonly email: Locator;
  readonly submitNewCreator: Locator;
  readonly exitAddNewCreator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("#storefront-create-channel_name");
    this.logo = page.locator("input[name='channel[logo]']");
    this.submitNewChannel = page.locator("#app-storefront-channel-create");
    this.exitAddNewChannel = page
      .getByRole("heading", { name: "Add new channel" })
      .getByRole("button");
    this.email = page.locator("input#staffer_email");
    this.submitNewCreator = page.locator("#app-storefront-staffer-create");
    this.exitAddNewCreator = page
      .getByRole("heading", { name: "Add new creator" })
      .getByRole("button");
  }
}
