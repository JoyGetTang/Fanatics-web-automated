import { EditStorefront } from "@/pages/liveOs/homePage/storefrontPage/storefront/editStorefrontPage";

export class EditStorefrontSteps extends EditStorefront {
  async inputShopDescription(shopDescription: string) {
    await this.shopDescriptionField.fill(shopDescription);
  }
  async inputWebsiteLink(websiteLink: string) {
    await this.websiteLinkField.fill(websiteLink);
  }
  async inputInstagramUsername(instagramUsername: string) {
    await this.instagramUsernameField.fill(instagramUsername);
  }
  async inputTiktokUsername(tiktokUsername: string) {
    await this.tiktokUsernameFiled.fill(tiktokUsername);
  }
  async inputTwitterUsername(twitterUsername: string) {
    await this.twitterUsernameFiled.fill(twitterUsername);
  }
  async saveChanges() {
    await this.saveChangesButton.click();
  }
}
