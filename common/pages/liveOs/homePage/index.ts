import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly scheduleShow: Locator;
  readonly home: Locator;
  readonly storefront: Locator;
  readonly shows: Locator;
  readonly orders: Locator;
  readonly breaker: Locator;
  readonly searchField: Locator;
  readonly detailsButton: Locator;
  readonly editButton: Locator;
  readonly publishedPrompt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.scheduleShow = page.getByRole("button", {
      name: "Schedule a show",
      exact: true,
    });
    this.home = page.getByRole("link", { name: "Home" });
    this.storefront = page.getByRole("link", { name: "Storefront" });
    this.shows = page.getByRole("link", { name: "Shows" });
    this.orders = page.getByRole("link", { name: "Orders" });
    this.breaker = page.locator('div[class="breaker"]');
    this.searchField = page.getByPlaceholder("Search Shows");
    this.detailsButton = page.getByTitle("Details").first();
    this.editButton = page.getByTitle("Edit").first();
    this.publishedPrompt = this.page.getByText("Live stream published");
  }
}
