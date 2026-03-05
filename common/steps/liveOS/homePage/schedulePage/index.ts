import { SchedulePage } from "@/pages/liveOs/homePage/schedulePage";

export interface ScheduleDetails {
  showName: string;
  imgFile: string;
  date: string;
  time: string;
  channel: string;
  description?: string | null;
  breakerOne: string;
  breakerTwo?: string;
}

export class ScheduleSteps extends SchedulePage {
  async inputShowName(showName: string) {
    await this.showTitle.fill(showName);
  }

  async uploadImg(imgFile: string) {
    const input = this.coverImage;
    await this.page.waitForTimeout(5000);
    input && (await input.setInputFiles(imgFile));
    await this.page.waitForTimeout(5000);
  }

  async inputDate(date: string) {
    await this.date.fill(date);
  }

  async inputTime(time: string) {
    await this.time.fill(time);
  }

  async selectChannel(channelName: string) {
    await this.channel.selectOption(channelName);
  }

  async inputDescription(description: string) {
    await this.descirption.fill(description);
  }

  async selectBreakerOne(breakerOne: string) {
    await this.breakerOne.selectOption(breakerOne);
  }

  async saveEdit() {
    await this.saveButton.click();
  }

  async saveForm() {
    await this.addListings.click();
  }

  async scheduleNewShow(scheduleDetails: ScheduleDetails, edit?: true) {
    const { showName, imgFile, date, time, channel, description, breakerOne } =
      scheduleDetails;
    await this.inputShowName(showName);
    await this.uploadImg(imgFile);
    await this.inputDate(date);
    await this.inputTime(time);
    await this.selectChannel(channel);
    description && (await this.inputDescription(description));
    await this.selectBreakerOne(breakerOne);
    edit ? await this.saveEdit() : await this.saveForm();
    await this.page.waitForTimeout(5000);
  }
}
