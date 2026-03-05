import { AddNewCreator } from "@/pages/liveOs/homePage/storefrontPage/storefront/addNewCreatorPage";

export interface NewCreatorInfo {
  email: string;
}
export class AddNewCreatorSteps extends AddNewCreator {
  async addNewCreator(newCreatorInfo: NewCreatorInfo) {
    await this.email.fill(newCreatorInfo.email);
    await this.submitNewCreator.click();
  }

  async exit() {
    await this.exitAddNewCreator.click();
  }
}
