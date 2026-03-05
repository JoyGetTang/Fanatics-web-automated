import { LoginPage } from "@/pages/liveOs/loginPage";
import { loginParams } from "@params/loginParams";
import { expect } from "@playwright/test";

export class LoginSteps extends LoginPage {
  async goTo(basicUrl: string) {
    await this.page.goto(basicUrl);
  }

  async clickSignIn() {
    await this.connect.click();
  }

  async inputEmail(email: string) {
    await this.email.fill(email);
  }

  async clickContinue() {
    await this.continue.click();
  }

  async inputPassword(password: string) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.login.click();
  }

  async waitToLoadPage(url: string) {
    await this.page.waitForURL(url);
  }
  async basicLoginSteps() {
    await this.goTo(loginParams.loginUrl);
    await expect(this.connect).toBeInViewport({ timeout: 20000 });
    await this.clickSignIn();
    await this.inputEmail(loginParams.account.email);
    await this.clickContinue();
    await this.inputPassword(loginParams.account.password);
    await this.clickLogin();
    await this.page.waitForTimeout(2000);
    await this.clickShop();
    // await this.waitToLoadPage(loginParams.hammerUrl);
    await this.goTo(loginParams.manageUrl);
    await this.waitToLoadPage(loginParams.manageUrl);
  }

  async clickShop() {
    try {
      // await this.page.getByText("test-shop").click({ timeout: 5000 });
      await this.page.getByText("Fanatics live").click({ timeout: 5000 });
    } catch (error) {}
  }
}
