import { type Locator, type Page } from "@playwright/test";

export class PoliciesAndSettings {
  readonly page: Page;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.copyButton = page.getByRole("button", { name: "Copy link" });
  }
}
