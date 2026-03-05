import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly alreadyHaveAccountButton: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly nextStep: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton =
      page.getByRole("button", { name: "Sign up" }) ||
      page.getByRole("button", { name: "Sign in" });
    this.alreadyHaveAccountButton = page.getByRole("button", {
      name: "Already have an account? Sign in",
    });
    this.email = page.getByLabel("Email");
    this.nextStep = page.getByRole("button", { name: "Next Step" });
    this.password = page.getByLabel("Password", { exact: true });
    this.loginButton = page.getByRole("button", {
      name: "Log in with Fanatics ID",
    });
  }
}
