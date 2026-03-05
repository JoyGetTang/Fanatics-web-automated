import { type Locator, type Page } from "@playwright/test";

export class StorefrontPage {
  readonly page: Page;
  readonly logInToStripe: Locator;
  readonly storefront: Locator;
  readonly channelsAndStaff: Locator;
  readonly policiesAndSettings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInToStripe = page.getByRole("button", { name: "Log in to Stripe" });
    this.storefront = page.getByRole("link", {
      name: "Storefront",
      exact: true,
    });
    this.channelsAndStaff = page.getByRole("link", {
      name: "Channels & staff",
    });
    this.policiesAndSettings = page.getByRole("link", {
      name: "Policies & settings",
    });
  }
}
