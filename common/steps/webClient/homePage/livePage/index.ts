import { LivePage } from "@/pages/webClient/homePage/livePage";
import { expect } from "@playwright/test";

export class LiveSteps extends LivePage {
  async clickView(breakName: string) {
    await this.page
      .locator("div")
      .filter({ hasText: breakName })
      .nth(1)
      .getByRole("button", { name: "View" })
      .click();
  }

  async clickFeaturedView() {
    await this.page
      .locator("div")
      .filter({ hasText: /^FEATURED/ })
      .nth(1)
      .getByRole("button", { name: "View" })
      .click();
  }

  async assertListingInFeature(breakName: string, exist: boolean = true) {
    try {
      exist
        ? await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^FEATURED/ })
              .nth(1)
              .filter({ hasText: breakName })
          ).toBeInViewport({ timeout: 5000 })
        : await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^FEATURED/ })
              .nth(1)
              .filter({ hasText: breakName })
          ).toBeHidden({ timeout: 5000 });
    } catch (error) {
      this.page.reload();
      exist
        ? await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^FEATURED/ })
              .nth(1)
              .filter({ hasText: breakName })
          ).toBeInViewport({ timeout: 5000 })
        : await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^FEATURED/ })
              .nth(1)
              .filter({ hasText: breakName })
          ).toBeHidden({ timeout: 5000 });
    }
  }

  async assertListingInComingUp(breakName: string, exist: boolean = true) {
    try {
      exist
        ? await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^COMING UP/ })
              .getByText(breakName, { exact: true })
          ).toBeInViewport({ timeout: 5000 })
        : await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^COMING UP/ })
              .getByText(breakName, { exact: true })
          ).toBeHidden({ timeout: 5000 });
    } catch (error) {
      this.page.reload();
      exist
        ? await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^COMING UP/ })
              .getByText(breakName, { exact: true })
          ).toBeInViewport({ timeout: 5000 })
        : await expect(
            this.page
              .locator("div")
              .filter({ hasText: /^COMING UP/ })
              .getByText(breakName, { exact: true })
          ).toBeHidden({ timeout: 5000 });
    }
  }

  async assertWon(
    purchaseType:
      | "PYT + setPrice"
      | "PYT + auction"
      | "Random + setPrice"
      | "Random + auction"
  ) {
    switch (purchaseType) {
      case "PYT + auction":
        await expect(this.page.getByText("@min032edit won")).toBeInViewport({
          timeout: 10000,
        });
        try {
          await this.clickFeaturedView();
        } catch (error) {}
        await expect(
          this.page.getByText("WON", { exact: true })
        ).toBeInViewport({
          timeout: 10000,
        });
        break;
      case "PYT + setPrice":
        await expect(this.page.getByText("@min032edit bought")).toBeInViewport({
          timeout: 20000,
        });
        try {
          await this.clickBuy();
        } catch (error) {}
        await expect(
          this.page.getByText("WON", { exact: true })
        ).toBeInViewport({
          timeout: 10000,
        });
        break;
      case "Random + setPrice":
        await expect(
          this.page.getByText("@min032edit bought into randomSetPrice!")
        ).toBeInViewport({
          timeout: 20000,
        });
        try {
          await this.clickBuy();
        } catch (error) {}
        await expect(
          this.page.getByText("WON", { exact: true })
        ).toBeInViewport({
          timeout: 10000,
        });
        break;
      case "Random + auction":
        await expect(this.page.getByText("@min032edit won")).toBeInViewport({
          timeout: 20000,
        });
        try {
          await this.clickFeaturedView();
        } catch (error) {}
        await expect(
          this.page.getByText("WON", { exact: true })
        ).toBeInViewport({
          timeout: 10000,
        });
        break;
    }
  }

  async assertRefundSuccess() {
    // try {
    //   await this.clickFeaturedView();
    // } catch (error) {}
    await expect(
      this.page.locator("div").filter({ hasText: /^WON$/ })
    ).toBeHidden();
    await this.closeListingViewButton.click();
    await expect(
      this.page
        .locator("div")
        .filter({ hasText: /^FEATURED/ })
        .nth(1)
        .getByText("30 spots left")
    ).toBeInViewport({ timeout: 5000 });
  }

  async clickBuy() {
    await this.page.waitForTimeout(3000);
    await this.buyButton.click();
  }

  async assertSpotPrice(spotName: string, price: string) {
    "Atlanta Hawks$999.00";
    // const priceInfo = spotName + `$${parseFloat(price).toFixed(2)}`;
    const priceInfo = spotName + `$${parseFloat(price)}`;

    try {
      await expect(this.page.getByText(priceInfo)).toBeInViewport({
        timeout: 10000,
      });
    } catch (error) {
      await this.page.reload();
      await expect(this.page.getByText(priceInfo)).toBeInViewport({
        timeout: 10000,
      });
    }
  }

  async assertAssign(
    purchaseType:
      | "PYT + setPrice"
      | "PYT + auction"
      | "Random + setPrice"
      | "Random + auction",
    assign: boolean = true
  ) {
    switch (purchaseType) {
      case "PYT + auction":
        try {
          await this.clickFeaturedView();
        } catch (error) {}
        // assign
        //   ? await expect(this.page.getByText("$0.00WON")).toBeInViewport({
        //       timeout: 10000,
        //     })
        //   : await expect(this.page.getByText("$0.00WON")).toBeHidden({
        //       timeout: 1000,
        //     });
        assign
          ? await expect(this.page.getByText("$0WON")).toBeInViewport({
              timeout: 10000,
            })
          : await expect(this.page.getByText("$0WON")).toBeHidden({
              timeout: 1000,
            });
        break;
      case "PYT + setPrice":
        try {
          await this.clickBuy();
        } catch (error) {}
        // assign
        //   ? await expect(
        //       this.page.getByText("$0.00$999.00(100% Off)")
        //     ).toBeInViewport({
        //       timeout: 10000,
        //     })
        //   : await expect(
        //       this.page.getByText("$0.00$999.00(100% Off)")
        //     ).toBeHidden({
        //       timeout: 1000,
        //     });
        assign
          ? await expect(
              this.page.getByText("$0$999(100% Off)")
            ).toBeInViewport({
              timeout: 10000,
            })
          : await expect(this.page.getByText("$0$999(100% Off)")).toBeHidden({
              timeout: 1000,
            });
        break;
      case "Random + auction":
        try {
          await this.clickFeaturedView();
        } catch (error) {}
        // assign
        //   ? await expect(this.page.getByText("$0.00WON")).toBeInViewport({
        //       timeout: 10000,
        //     })
        //   : await expect(this.page.getByText("$0.00WON")).toBeHidden({
        //       timeout: 1000,
        //     });

        assign
          ? await expect(this.page.getByText("$0WON")).toBeInViewport({
              timeout: 10000,
            })
          : await expect(this.page.getByText("$0WON")).toBeHidden({
              timeout: 1000,
            });
        break;
      case "Random + setPrice":
        try {
          await this.clickBuy();
        } catch (error) {}
        // assign
        //   ? await expect(
        //       this.page.getByText("$0.00$100.00(100% Off)")
        //     ).toBeInViewport({
        //       timeout: 10000,
        //     })
        //   : await expect(
        //       this.page.getByText("$0.00$100.00(100% Off)")
        //     ).toBeHidden({
        //       timeout: 1000,
        //     });
        assign
          ? await expect(
              this.page.getByText("$0$100(100% Off)")
            ).toBeInViewport({
              timeout: 10000,
            })
          : await expect(this.page.getByText("$0$100(100% Off)")).toBeHidden({
              timeout: 1000,
            });
        break;
    }
  }
}
