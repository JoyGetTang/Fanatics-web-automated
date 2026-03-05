import { Page } from "@playwright/test";
import { LoginSteps } from "@/steps/webClient/loginPage";
import { HomeSteps } from "@/steps/webClient/homePage";
import { LiveSteps } from "./homePage/livePage";

export default class ClientSteps {
  page: Page;
  loginSteps;
  homeSteps;
  liveSteps;
  constructor(page: Page) {
    this.page = page;
    this.loginSteps = new LoginSteps(page);
    this.homeSteps = new HomeSteps(page);
    this.liveSteps = new LiveSteps(page);
  }

  async loginAndEnterShow(showname: string) {
    await this.homeSteps.goHomePage();
    // await this.loginSteps.clientSignIn();
    await this.homeSteps.enterLive(showname);
  }
}
