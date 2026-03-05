import { ShowsPage } from "@/pages/liveOs/homePage/showsPage";
import { expect } from "@playwright/test";

export class ShowsSteps extends ShowsPage {
  async enterShow(showName: string) {
    try {
      await this.page
        .locator("#streams div")
        .filter({ hasText: showName })
        .getByRole("link")
        .nth(0)
        .click();
    } catch (error) {}
  }
}
