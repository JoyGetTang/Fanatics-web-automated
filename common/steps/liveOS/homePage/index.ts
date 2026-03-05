import { HomePage } from "@/pages/liveOs/homePage";
import { expect } from "@playwright/test";

export class HomeSteps extends HomePage {
  async scheduleNewShow() {
    await this.scheduleShow.click();
    try {
      await expect(
        this.page.getByPlaceholder("Keep it short and sweet")
      ).toBeInViewport({ timeout: 3000 });
    } catch (error) {
      await this.scheduleShow.click();
    }
  }

  async goHome() {
    await this.home.click();
  }

  async searchShow(showName: string) {
    try {
      await this.searchField.fill(showName);
    } catch (error) {
      await this.page.reload();
      await this.page.waitForTimeout(2000);
      await this.searchField.fill(showName);
    }
    await this.page.waitForTimeout(2000);
  }

  async enterShow() {
    await this.detailsButton.click();
  }
  async enterShowV2(showname: string) {
    await this.page
      .locator("#channel-live-streams-list div")
      .filter({ hasText: showname })
      .getByRole("link")
      .first()
      .click({ timeout: 20000 });
  }

  async editShow(showname: string) {
    await this.page
      .locator("#channel-live-streams-list div")
      .filter({ hasText: showname })
      .getByRole("link")
      .nth(2)
      .click();
  }

  async goStroefront() {
    await this.storefront.click();
  }

  async goShows() {
    await this.shows.click();
    await expect(this.page.getByText("Status")).toBeInViewport({
      timeout: 10000,
    });
  }

  async goOrders() {
    await this.orders.click();
  }

  async goProfile() {
    await this.breaker.click();
  }

  async searchAndEnterShow(showName: string) {
    await this.searchShow(showName);
    try {
      await this.assertShowName(showName);
      await this.enterShowV2(showName);
    } catch (error) {
      await this.page.reload();
      await this.searchShow(showName);
      await this.assertShowName(showName);
      await this.enterShowV2(showName);
    }
  }

  async searchAndEditShow(showName: string) {
    await this.searchShow(showName);
    await this.assertShowName(showName);
    await this.editShow(showName);
  }

  async assertShowName(showName: string) {
    await expect(
      this.page.getByRole("heading", { name: showName }).last()
    ).toBeInViewport({
      timeout: 10000,
    });
  }

  async asserPublishedSuccess() {
    // await expect(this.publishedPrompt).toBeVisible({ timeout: 10000 });
  }

  assertUnpublished(showName: string) {
    expect(
      this.page
        .locator("#channel-live-streams-list >  div ")
        .filter({ has: this.page.getByText(showName) })
        .filter({ has: this.page.getByText("Unpublished") })
    );
  }

  assertUpcoming(showName: string) {
    expect(
      this.page
        .locator("#channel-live-streams-list >  div ")
        .filter({ has: this.page.getByText(showName) })
        .filter({ has: this.page.getByText("Upcoming") })
    );
  }
}
