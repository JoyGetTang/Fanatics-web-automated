import { PoliciesAndSettings } from "@/pages/liveOs/homePage/storefrontPage/policiesAndSettings";

export class PoliciesAndSettingsSteps extends PoliciesAndSettings {
  async copyLink() {
    await this.copyButton.click();
  }
}
