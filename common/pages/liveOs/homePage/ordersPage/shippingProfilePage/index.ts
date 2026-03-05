import { type Locator, type Page } from "@playwright/test";

export class ShippingPorfilePage {
  readonly page: Page;
  readonly makeDefault: Locator;
  readonly makedefaultSuccess: Locator;
  readonly profileName: Locator;
  readonly mailingName: Locator;
  readonly fixedRate: Locator;
  readonly addressFirst: Locator;
  readonly pounds: Locator;
  readonly ounces: Locator;
  readonly addressSeconde: Locator;
  readonly length: Locator;
  readonly width: Locator;
  readonly height: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zip: Locator;
  readonly save: Locator;

  constructor(page: Page) {
    this.page = page;
    this.makeDefault = page.getByRole("link", { name: "Make Default" });
    this.makedefaultSuccess = page.getByText(
      "Shipping profile updated successfully."
    );
    this.profileName = page.locator("#attributes_sender");
    this.mailingName = page.locator("#address_recipient");
    this.fixedRate = page.locator("#attributes_fee");
    this.addressFirst = page.locator("#address_line1");
    this.pounds = page.locator("#attributes_pound");
    this.ounces = page.locator("#attributes_ounce");
    this.addressSeconde = page.locator("#address_line2");
    this.length = page.locator("#attributes_length");
    this.width = page.locator("#attributes_width");
    this.height = page.locator("#attributes_height");
    this.city = page.locator("#address_city");
    this.state = page.locator("#address_state");
    this.zip = page.locator("#address_postal_code");
    this.save = page.getByRole("button", { name: "Save" });
  }
}
