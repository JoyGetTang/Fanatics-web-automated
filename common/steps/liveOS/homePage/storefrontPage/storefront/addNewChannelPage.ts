import { AddNewChannel } from "@/pages/liveOs/homePage/storefrontPage/storefront/addNewChannelPage";

export interface NewChannelInfo {
  title: string;
  logo: "../logo.jpeg" | string;
}

export class AddNewChannelSteps extends AddNewChannel {
  async addNewChannel(newChannelInfo: NewChannelInfo) {
    await this.title.fill(newChannelInfo.title);
    await this.logo.setInputFiles(newChannelInfo.logo);
    await this.page.waitForTimeout(3000);
    await this.submitNewChannel.click();
  }

  async exit() {
    await this.exitAddNewChannel.click();
  }
}
