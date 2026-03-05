import { Browser, type Locator, type Page } from "@playwright/test";

export class LivePage {
  readonly page: Page;
  readonly customBidButton: Locator;
  readonly buyButton: Locator;
  readonly closeListingViewButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customBidButton = page.getByText("Custom Bid", { exact: true });
    this.buyButton = page
      .getByRole("button", { name: "Buy", exact: true })
      .nth(0);
    this.closeListingViewButton = page.getByLabel("Close");
  }

  static async build(browser: Browser): Promise<LivePage> {
    const page = await browser.newPage({ storageState: ".auth/client.json" });
    return new LivePage(page);
  }
}
