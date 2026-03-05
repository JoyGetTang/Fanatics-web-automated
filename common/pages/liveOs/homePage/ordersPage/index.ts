import { type Locator, type Page } from "@playwright/test";

export class OrdersPage {
  readonly page: Page;
  readonly completedStreams: Locator;
  readonly shippingProfiles: Locator;
  readonly processARefund: Locator;
  readonly refundButton: Locator;
  readonly refundSuccessMessage: Locator;
  readonly closeRefundFrameButton: Locator;
  readonly orderFreeOrRefunded: Locator;
  readonly searchArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completedStreams = page.getByRole("link", {
      name: "Completed Streams",
    });
    this.shippingProfiles = page.getByRole("link", {
      name: "Shipping profiles",
    });
    this.processARefund = page.getByText("Process a refund", { exact: true });
    this.refundButton = page.getByRole("button", { name: "Refund" });
    this.refundSuccessMessage = page.getByText("Order refunded successfully.");
    this.closeRefundFrameButton = page
      .getByRole("heading", { name: "Issue a refund" })
      .getByRole("button");
    this.orderFreeOrRefunded = page
      .getByText("ALL SPOTS ASSIGNED OR REFUNDED")
      .first();
    this.searchArea = page.getByPlaceholder(
      "Search user, order number, or tracking number"
    );
  }
}
