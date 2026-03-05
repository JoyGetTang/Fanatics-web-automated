import { GiveawayInfo, OneUpAuctionInfo, PollInfo } from "@/steps/liveOS";

export const giveawayInfo: GiveawayInfo = {
  title: "Test giveaway",
  type: "All viewers",
};
export const oneUpAuctionInfo: OneUpAuctionInfo = {
  title: "autoOneUpAuction",
  bid: "100",
};

export const pollInfo1: PollInfo = {
  title: "Test poll 1",
  options: ["test Option one", " test Option two", "test Option three"],
  maxOptions: [
    "test Option one",
    " test Option two",
    "test Option three",
    "test four delete option",
  ],
};

export const pollInfo2: PollInfo = {
  title: "Test poll 2",
  options: ["test Option one", " test Option two", "test Option three"],
  maxOptions: [
    "test Option one",
    " test Option two",
    "test Option three",
    "test four delete option",
  ],
};

export const pollInfo3: PollInfo = {
  title: "Test poll 3",
  options: ["test Option one", " test Option two", "test Option three"],
  maxOptions: [
    "test Option one",
    " test Option two",
    "test Option three",
    "test four delete option",
  ],
};

export const giveawayForAllUsers: GiveawayInfo = {
  title: "Test giveaway",
  type: "All viewers",
};
export const giveawayForFollowersOnly: GiveawayInfo = {
  title: "Test giveaway",
  type: "Followers only",
};
export const giveawayWithCSV: GiveawayInfo = {
  title: "Test giveaway",
  type: "Upload CSV",
};

export const assignUsername: string = "min0127dev";
