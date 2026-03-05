import { ChannelsAndStaff } from "@/pages/liveOs/homePage/storefrontPage/channelAndStaff";
import { NewChannelInfo } from "@/steps/liveOS/homePage/storefrontPage/storefront/addNewChannelPage";
import { NewCreatorInfo } from "@/steps/liveOS/homePage/storefrontPage/storefront/addNewCreatorPage";

export class ChannelAndStaffSteps extends ChannelsAndStaff {
  async addNewChannel(newChannelInfo: NewChannelInfo) {
    await this.title.fill(newChannelInfo.title);
    await this.logo.setInputFiles(newChannelInfo.logo);
    await this.page.waitForTimeout(3000);
    await this.submitNewChannel.click();
  }

  async exitAddChannel() {
    await this.exitAddNewChannel.click();
  }

  async addNewCreator(newCreatorInfo: NewCreatorInfo) {
    await this.email.fill(newCreatorInfo.email);
    await this.submitNewCreator.click();
  }

  async exitAddCreator() {
    await this.exitAddNewCreator.click();
  }
}
