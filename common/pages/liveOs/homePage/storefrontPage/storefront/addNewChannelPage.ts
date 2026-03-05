import { type Locator, type Page } from "@playwright/test";

export interface NewChannelInfo {
  title: string;
  logo: "../logo.jpeg" | string;
}

export class AddNewChannel {
  readonly page: Page;
  readonly title: Locator;
  readonly logo: Locator;
  readonly submitNewChannel: Locator;
  readonly exitAddNewChannel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("#storefront-create-channel_name");
    this.logo = page.locator("input[name='channel[logo]']");
    this.submitNewChannel = page.locator("#app-storefront-channel-create");
    this.exitAddNewChannel = page
      .getByRole("heading", { name: "Add new channel" })
      .getByRole("button");
  }
}
