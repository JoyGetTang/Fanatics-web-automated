import { ShippingPorfilePage } from "@/pages/liveOs/homePage/ordersPage/shippingProfilePage";

export interface ProfileInfo {
  profileName: string;
  mailingName: string;
  fixedRate: string;
  addressFirst: string;
  pounds: string;
  ounces: string;
  addressSeconde: string;
  lenth: string;
  width: string;
  height: string;
  city: string;
  state: string;
  zip: string;
}
export class StepsShippingPorfilePage extends ShippingPorfilePage {
  async makeThisDefault() {
    await this.makeDefault.click();
  }

  async createNewProfile(Profile: ProfileInfo) {
    await this.profileName.fill(Profile.profileName);
    await this.mailingName.fill(Profile.mailingName);
    await this.fixedRate.fill(Profile.fixedRate);
    await this.addressFirst.fill(Profile.addressFirst);
    await this.pounds.fill(Profile.pounds);
    await this.ounces.fill(Profile.ounces);
    await this.addressSeconde.fill(Profile.addressSeconde);
    await this.length.fill(Profile.lenth);
    await this.width.fill(Profile.width);
    await this.height.fill(Profile.height);
    await this.city.fill(Profile.city);
    await this.state.fill(Profile.state);
    await this.zip.fill(Profile.zip);
  }

  async saveProfile() {
    await this.save.click();
  }
}
