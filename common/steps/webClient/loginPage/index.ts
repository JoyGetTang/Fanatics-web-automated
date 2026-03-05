import { LoginPage } from "@/pages/webClient/loginPage";
import { loginParams } from "@params/loginParams";
import { expect } from "@playwright/test";

export class LoginSteps extends LoginPage {
  async goTo(basicUrl: string) {
    await this.page.goto(basicUrl);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async inputEmail(email: string) {
    await this.email.fill(email);
  }

  async clickNextStep() {
    await this.nextStep.click();
  }

  async inputPassword(password: string) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async waitToLoadPage(url: string) {
    await this.page.waitForURL(url);
  }
  async clientLoginSteps() {
    await this.goTo(loginParams.clientUrl);
    // await expect(this.signInButton).toBeInViewport({ timeout: 10000 });
    // await this.page.reload();
    await expect(this.signInButton).toBeInViewport({ timeout: 10000 });
    await this.clickSignIn();
    await this.alreadyHaveAccountButton.click();
    await this.page.waitForTimeout(5000);
    try {
      await this.inputEmail(loginParams.client.email);
    } catch (error) {
      await this.goTo(loginParams.homeUrl);
      await this.clickSignIn();
      await this.alreadyHaveAccountButton.click();
      await this.page.waitForTimeout(5000);
      try {
        await this.inputEmail(loginParams.client.email);
      } catch (error) {
        await this.alreadyHaveAccountButton.click();
        await this.page.waitForTimeout(5000);
        await this.inputEmail(loginParams.client.email);
      }
    }
    await this.clickNextStep();
    await this.inputPassword(loginParams.client.password);
    await this.clickLogin();
    try {
      await this.page.waitForTimeout(2000);
      await this.waitToLoadPage(loginParams.homeUrl);
    } catch (error) {
      await this.clickLogin();
      await this.page.waitForTimeout(2000);
      await this.waitToLoadPage(loginParams.homeUrl);
    }
  }

  async clientSignIn() {
    await this.goTo(loginParams.clientUrl);
    await expect(this.signInButton).toBeInViewport({ timeout: 20000 });
    await this.clickSignIn();
    await this.alreadyHaveAccountButton.click();
    await this.goTo(loginParams.homeUrl);
    await this.clickSignIn();
    await this.alreadyHaveAccountButton.click();
  }
}
