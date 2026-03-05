import { OrdersPage } from "@/pages/liveOs/homePage/ordersPage";
import { expect } from "@playwright/test";

export class OrdersPageSteps extends OrdersPage {
  async goComletedStreams() {
    await this.completedStreams.click();
  }
  async goShippingProfiles() {
    await this.shippingProfiles.click();
  }

  async getInStreamDetails(streamTitle: string) {
    await this.page.getByRole("link", { name: streamTitle }).click();
  }
  async refundSpots() {
    await this.processARefund.click();
    try {
      await expect(this.page.getByText("Issue a refund")).toBeInViewport({
        timeout: 2000,
      });
    } catch (error) {
      await this.processARefund.click();
    }
  }

  async giveawayCantBeRefunded() {
    await expect(
      this.page.getByText("(Giveaway's can't be refunded)").first()
    ).toBeInViewport();
  }

  async refundSpot() {
    await this.page.locator(".w-4").click();
    await this.refundButton.click();
    await expect(this.refundSuccessMessage).toBeInViewport({ timeout: 10000 });
    await this.closeRefundFrameButton.click();
  }

  async assertRefundSuccess() {
    await this.page.reload();
    await expect(
      this.page.getByText("Refunded", { exact: true })
    ).toBeInViewport({ timeout: 10000 });
  }

  async assertOrderFreeOrRefunded() {
    await expect(this.orderFreeOrRefunded).toBeInViewport({ timeout: 10000 });
    await this.orderFreeOrRefunded.click();
    await expect(this.page.getByText("Issue a refund")).toBeHidden({
      timeout: 5000,
    });
  }
}
