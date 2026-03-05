import { scheduleParams } from "@/params/scheduleParams";
import { ScheduleDetails } from "@/steps/liveOS/homePage/schedulePage";
import { Page } from "@playwright/test";
import moment from "moment";
import { UUID } from "crypto";
// import { v4 as uuidv4 } from "uuid";

const getScheduleDetails = (
  Name: string,
  // Params?: ScheduleParams,
  liveStreamList?: string[]
) => {
  const uuid = "asdsad-asdasdm-sad".split("-").shift();
  const startDate = moment().utc().format("YYYY-MM-DD");
  const startTime = moment().utc().format("HH:mm");
  const showName = Name + uuid;
  const scheduleDetails: ScheduleDetails = {
    showName,
    imgFile: scheduleParams.commonParams.imgPath,
    date: startDate,
    time: startTime,
    channel: scheduleParams.commonParams.channel,
    breakerOne: scheduleParams.commonParams.breakerOne,
  };
  liveStreamList && liveStreamList.push(showName);
  return scheduleDetails;
};

export const retryOnFailed = async (page: Page, func: () => Promise<void>) => {
  try {
    await func();
  } catch (error) {
    page.reload();
    await func();
  }
};

export const getRandomSetPriceBuyerInfo = (
  username: string,
  pricePerSpot: string
) => {
  // const buyersInfo =
  //   "@" +
  //   username +
  //   "Spot randomly assigned" +
  //   `$${parseFloat(pricePerSpot).toFixed(2)}`;
  const buyersInfo =
    // "@" + username + "Spot randomly assigned" + `$${parseFloat(pricePerSpot)}`;
    "@" + username + "Spot randomly assigned";
  return buyersInfo;
};

export const getPYTSetPriceBuyerInfo = (
  username: string,
  spotname: string,
  spotPrice: string
) => {
  const buyersInfo =
    // "@" + username + spotname + `$${parseFloat(spotPrice).toFixed(2)}`;
    // "@" + username + spotname + `$${parseFloat(spotPrice)}`;

    "@" + username + spotname;

  return buyersInfo;
};

export const getPYTAuctionBuyerInfo = (
  username: string,
  spotname: string,
  spotPrice: string
) => {
  const buyersInfo =
    // "@" + username + spotname + `$${parseFloat(spotPrice).toFixed(2)}`;
    "@" + username + spotname + `$${parseFloat(spotPrice)}`;

  // const buyersInfo =
  //   spotname + "@" + username + `$${parseFloat(spotPrice).toFixed(2)}`;
  return buyersInfo;
};

export const getRandomAuctionBuyerInfo = (
  username: string,
  innerText: string,
  spotPrice: string
) => {
  const buyersInfo =
    // "@" + username + innerText + `$${parseFloat(spotPrice).toFixed(2)}`;
    "@" + username + innerText + `$${parseFloat(spotPrice)}`;

  return buyersInfo;
};

export const getAssignRandomSetPriceBuyerInfo = (username: string) => {
  const buyersInfo = "Spot randomly assigned" + "@" + username + "$0";
  return buyersInfo;
};

export const getAssignRandomAuctionBuyerInfo = (
  username: string,
  assignSpotName: string
) => {
  // const buyersInfo = "@" + username + "Atlanta Hawks";
  // const buyersInfo = assignSpotName + "@" + username + "$0";
  const buyersInfo = "@" + username + "$0";

  return buyersInfo;
};

export const getAssignPYTSetPriceBuyerInfo = (
  username: string,
  assignSpotName: string
) => {
  // const buyersInfo = assignSpotName + "@" + username + "$0";
  const buyersInfo = "@" + username + "$0";

  return buyersInfo;
};

export const getAssignPYTAuctionBuyerInfo = (
  username: string,
  assignSpotName: string
) => {
  // const buyersInfo = assignSpotName + "@" + username + "$0";
  const buyersInfo = "@" + username + "$0";

  return buyersInfo;
};

export const createBreaksShowDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("createBreaksShow", liveStreamList);

export const createUnpublishedDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("createUnpublished", liveStreamList);

export const createUpcomingDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("createUpcoming", liveStreamList);

export const changeDraftShowDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("changeDraftShowDetails", liveStreamList);

export const changePublishedShowDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("changePublishedShowDetails", liveStreamList);

export const EditingBreaksDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("EditingBreaks", liveStreamList);

export const endLivestreamDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("endLivestream", liveStreamList);

export const takenLivestreamDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("takenLivestream", liveStreamList);

export const smokeDetails = (liveStreamList?: string[]): ScheduleDetails =>
  getScheduleDetails("smoke", liveStreamList);

export const startingLivestreamDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("startingLivestream", liveStreamList);

export const startingBreaksDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("startingBreaks", liveStreamList);

export const upAuctionNoJoinDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("upAuctionNoJoin", liveStreamList);

export const upAuctionJoinByApiDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("upAuctionJoinByApi", liveStreamList);

export const giveawayNoJoinDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("giveawayNoJoin", liveStreamList);

export const giveawayJoinByApiDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("giveawayJoinByApi", liveStreamList);

export const giveawayForAllUsersDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("giveawayForAllUsers", liveStreamList);

export const giveawayForFollowersOnlyDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("giveawayForFollowersOnly", liveStreamList);

export const giveawayWithCSVDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("giveawayWithCSV", liveStreamList);

export const addFewProductsDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("addFewProducts", liveStreamList);

export const deleteProductsDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("deleteProducts", liveStreamList);

export const editingListingDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("editingListing", liveStreamList);

export const createNewTemplateDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("createNewTemplate", liveStreamList);

export const createNewTemplateRandomAuctionBreakWithNoBreakDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("templateRandomAuctionBreakWithNoBreak", liveStreamList);

export const createNewTemplateRandomAuctionBreakWithStashOrPassDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails(
    "templateRandomAuctionBreakWithStashOrPass",
    liveStreamList
  );

export const createNewTemplateRandomAuctionBreakWithPick2Choose1Details = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails(
    "templateRandomAuctionBreakWithPick2Choose1",
    liveStreamList
  );

export const createNewTemplateRandomAuctionBreakWithExtendedBiddingDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails(
    "templateRandomAuctionBreakWithExtendedBidding",
    liveStreamList
  );

export const createNewTemplateRandomSetPriceDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("templateRandomSetPrice", liveStreamList);

export const createNewTemplatePickYourSpotSetPriceDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("templatePickYourSpotSetPrice", liveStreamList);

export const createNewTemplatePickYourSpotAuctionBreakWithNoBreakDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails(
    "templatePickYourSpotAuctionBreakWithNoBreak",
    liveStreamList
  );

export const createNewTemplatePickYourSpotAuctionBreakWithExtendedBiddingDetails =
  (liveStreamList?: string[]): ScheduleDetails =>
    getScheduleDetails(
      "templatePickYourSpotAuctionBreakWithExtendedBidding",
      liveStreamList
    );

export const assignASpotDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("assignASpot", liveStreamList);

export const randomizeSelectSpotsDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("randomizeSelectSpots", liveStreamList);

export const sendMessageDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("sendMessage", liveStreamList);

export const copyBreakDetails = (liveStreamList?: string[]): ScheduleDetails =>
  getScheduleDetails("copyBreak", liveStreamList);

export const editNameDetails = (liveStreamList?: string[]): ScheduleDetails =>
  getScheduleDetails("editName", liveStreamList);

export const moveBreakOriginStreamDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("moveBreakOriginStream", liveStreamList);

export const moveBreakTagetStreamDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("moveBreakTagetStream", liveStreamList);

export const purchase1UpAuctionDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("purchase1UpAuction", liveStreamList);

export const randomAuctionStashPassDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("randomAuctionStashPass", liveStreamList);

export const randomAuctionP2C1Details = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("randomAuctionP2C1", liveStreamList);

export const RandomSetpriceDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("RandomSetprice", liveStreamList);

export const pickYourSpotAuctionDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("pickYourSpotAuction", liveStreamList);

export const pickYourSpotSetPriceDetails = (
  liveStreamList?: string[]
): ScheduleDetails =>
  getScheduleDetails("pickYourSpotSetPrice", liveStreamList);

export const createNewPollDetails = (
  liveStreamList?: string[]
): ScheduleDetails => getScheduleDetails("createNewPoll", liveStreamList);

export const gameDetails = (liveStreamList?: string[]): ScheduleDetails =>
  getScheduleDetails("testGame", liveStreamList);

export const overlaysDetails = (liveStreamList?: string[]): ScheduleDetails =>
  getScheduleDetails("overlays", liveStreamList);

export const singlesDetails = (liveStreamList?: string[]): ScheduleDetails =>
  getScheduleDetails("singlesListing", liveStreamList);
