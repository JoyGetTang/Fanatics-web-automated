import { CompletedStreams } from "@/pages/liveOs/homePage/ordersPage/completedStreamPage";

export class StepsCompletedStreams extends CompletedStreams {
  async selectStream(streamTitle: string) {
    await this.page.getByRole("link", { name: streamTitle }).click();
  }
  async search(searchInfo: string) {
    await this.searchField.fill(searchInfo);
    await this.page.keyboard.press("Enter");
  }
}
