import { StorefrontPage } from "@/pages/liveOs/homePage/storefrontPage";

export class StorefrontSteps extends StorefrontPage {
  async goStorefront() {
    await this.storefront.click();
  }

  async goChannelsAndStaff() {
    await this.channelsAndStaff.click();
  }

  async goPoliciesAndSettings() {
    await this.policiesAndSettings.click();
  }
}
