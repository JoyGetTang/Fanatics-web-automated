import { Storefront } from "@/pages/liveOs/homePage/storefrontPage/storefront";

export class StorefrontSteps extends Storefront {
  async addNewChannel() {
    await this.addNewChannelButton.click();
  }

  async addNewCreator() {
    await this.addNewCreatorButton.click();
  }

  async scheduleAshow() {
    await this.scheduleAShowButton.click();
  }

  async editStorefront() {
    await this.editStorefrontButton.click();
  }
}
