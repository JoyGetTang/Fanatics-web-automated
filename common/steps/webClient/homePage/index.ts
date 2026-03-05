import { HomePage } from "@/pages/webClient/homePage";
import { loginParams } from "@/params/loginParams";
import { expect } from "@playwright/test";

export class HomeSteps extends HomePage {
  async goHomePage() {
    await this.page.goto(loginParams.clientUrl);
  }

  async enterLive(liveName: string) {
    await expect(this.page.getByText("Live now")).toBeInViewport({
      timeout: 15000,
    });
    await this.page
      .getByPlaceholder("Search shows, shops and spots...")
      .fill(liveName);
    await this.page.keyboard.press("Enter");
    try {
      await this.page.getByText(liveName).click({ timeout: 30000 });
    } catch (error) {
      await this.page.reload();
      await this.page.getByText(liveName).click({ timeout: 30000 });
    }
  }
}
