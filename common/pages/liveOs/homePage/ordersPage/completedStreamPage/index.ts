import { type Locator, type Page } from "@playwright/test";

export class CompletedStreams {
  readonly page: Page;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.getByPlaceholder(
      "Search user, order number, or tracking number"
    );
  }
}
