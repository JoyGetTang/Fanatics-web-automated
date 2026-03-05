import { type Locator, type Page } from "@playwright/test";

export class EditStorefront {
  readonly page: Page;
  readonly shopDescriptionField: Locator;
  readonly websiteLinkField: Locator;
  readonly instagramUsernameField: Locator;
  readonly tiktokUsernameFiled: Locator;
  readonly twitterUsernameFiled: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopDescriptionField = page.locator("#shop_description");
    this.websiteLinkField = page.getByPlaceholder("Website link");
    this.instagramUsernameField = page.getByPlaceholder("Instagram username");
    this.tiktokUsernameFiled = page.getByPlaceholder("Tiktok username");
    this.twitterUsernameFiled = page.getByPlaceholder("Twitter username");
    this.saveChangesButton = page.getByRole("button", { name: "Save changes" });
  }
}
