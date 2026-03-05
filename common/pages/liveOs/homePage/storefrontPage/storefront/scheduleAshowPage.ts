import { type Locator, type Page } from "@playwright/test";
import { SchedulePage } from "../../schedulePage";

export class ScheduleAShow extends SchedulePage {
  constructor(page: Page) {
    super(page);
  }
}
