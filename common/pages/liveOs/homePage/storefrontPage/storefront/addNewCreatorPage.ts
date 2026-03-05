import { type Locator, type Page } from "@playwright/test";

export interface NewCreatorInfo {
  email: string;
}
export class AddNewCreator {
  readonly page: Page;
  readonly email: Locator;
  readonly submitNewCreator: Locator;
  readonly exitAddNewCreator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator("input#staffer_email");
    this.submitNewCreator = page.locator("#app-storefront-staffer-create");
    this.exitAddNewCreator = page
      .getByRole("heading", { name: "Add new creator" })
      .getByRole("button");
  }
}
