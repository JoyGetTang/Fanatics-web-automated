import { type Locator, type Page } from "@playwright/test";

export class Storefront {
  readonly page: Page;
  readonly editStorefrontButton: Locator;
  readonly addNewChannelButton: Locator;
  readonly addNewCreatorButton: Locator;
  readonly scheduleAShowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editStorefrontButton = page.getByRole("link", {
      name: "Edit storefront",
    });
    this.addNewChannelButton = page.getByRole("button", {
      name: "Add new channel",
    });
    this.addNewCreatorButton = page.getByRole("button", {
      name: "+ New creator",
    });
    this.scheduleAShowButton = page.getByText("Schedule a show").nth(1);
  }
}
