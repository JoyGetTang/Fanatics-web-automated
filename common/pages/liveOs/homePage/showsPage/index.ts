import { type Locator, type Page } from "@playwright/test";

export class ShowsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
