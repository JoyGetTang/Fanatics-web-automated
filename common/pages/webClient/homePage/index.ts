import { Browser, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async build(browser: Browser): Promise<HomePage> {
    const page = await browser.newPage({ storageState: ".auth/client.json" });
    return new HomePage(page);
  }
}
