import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly connect: Locator;
  readonly email: Locator;
  readonly continue: Locator;
  readonly password: Locator;
  readonly login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connect = page.getByRole("link", { name: "Connect with Fanatics ID" });
    this.email = page.getByLabel("Email");
    this.continue = page.getByRole("button", { name: "Continue" });
    this.password = page.getByLabel("Password", { exact: true });
    this.login = page.getByRole("button", { name: "Log in with Fanatics ID" });
  }
}
