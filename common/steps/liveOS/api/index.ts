import {
  Account,
  bid,
  enterGiveaway,
  getGiveawayId,
  getLiveId,
  getLivestream,
  getSpotId,
  getTokens,
  getUserShippingAndPayment,
  getUseroOrders,
  purchasePYTsetPrice,
  purchaseRandomSpot,
  getPollsAndOptionsId,
  participatePoll,
  getClientLivestream,
  getOrder,
} from "@/api";
export class ApiSteps {
  participeGiveaway = async (account: Account, live: string) => {
    const tokens = await getTokens(account);
    const auth = "Bearer" + tokens.login.accessToken;
    const liveId = (await getLiveId(live)).liveStreamByName.id;
    const givewayId = (await getGiveawayId(auth, liveId))?.id;
    const enter = await enterGiveaway(auth, givewayId);
    return enter;
  };

  participeOneUp = async (account: Account, live: string, bidCents: string) => {
    const tokens = await getTokens(account);
    const auth = "Bearer" + tokens.login.accessToken;
    const liveId = (await getLiveId(live)).liveStreamByName.id;
    const OneUpId = await getSpotId(auth, liveId);
    const enter = await bid(auth, bidCents, OneUpId);
    return enter;
  };

  participatePoll = async (
    account: Account,
    liveStreamTitle: string,
    optionIndex: number,
    isParticipate: boolean = true
  ) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    const liveId = (await getLiveId(liveStreamTitle)).liveStreamByName.id;
    const PollsAndOptionsId = (await getClientLivestream(auth, liveId))
      .liveStream.poll;
    const pollsId = PollsAndOptionsId.id;
    const optionId = PollsAndOptionsId.options[optionIndex].id;
    const optionTitle = PollsAndOptionsId.options[optionIndex].title;
    const optionPercentageDisplay =
      PollsAndOptionsId.options[optionIndex].votePercentage.percentageDisplay;
    const expectedPollResultText: string =
      optionTitle + optionPercentageDisplay + "%";
    if (isParticipate) {
      const Participate = (await participatePoll(auth, pollsId, optionId))
        .voteCast.successful;
      return { Participate, expectedPollResultText };
    }
    return { expectedPollResultText };
  };

  buyRandomSetPriceSpots = async (
    account: Account,
    live: string,
    quantity: number
  ) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    const liveId = (await getLiveId(live)).liveStreamByName.id;
    const breakId = (await getLivestream(liveId)).liveStream.currentBreak.id;
    const getUserShippingAndPaymentInfo = await getUserShippingAndPayment(auth);
    const paymentMethodId =
      getUserShippingAndPaymentInfo.currentUser.defaultPaymentMethod.id;
    const shippingAddressId =
      getUserShippingAndPaymentInfo.currentUser.defaultShippingAddress.id;
    const buyRandomSpots = await purchaseRandomSpot(
      auth,
      breakId,
      paymentMethodId,
      shippingAddressId,
      quantity
    );
    return buyRandomSpots;
  };

  getPurchaseId = async (account: Account, showname: string) => {
    return (await this.buyRandomSetPriceSpots(account, showname, 1))
      .purchaseRandomSpot.result.order.id;
  };

  getOderDetails = async (account: Account, id: string) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    const res = await getOrder(auth, id);
    return res;
  };

  getShipping = async (account: Account, id: string) => {
    return (await this.getOderDetails(account, id)).currentUser.orders.edges[0]
      .node.shippingValueInCents;
  };

  buyPYTsetPrice = async (account: Account, live: string) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    const liveId = (await getLiveId(live)).liveStreamByName.id;
    const breakId = (await getLivestream(liveId)).liveStream.currentBreak.id;
    const breakSpotIdList = (await getLivestream(liveId)).liveStream
      .currentBreak.breakSlots[0].id;
    const getUserShippingAndPaymentInfo = await getUserShippingAndPayment(auth);
    const paymentMethodId =
      getUserShippingAndPaymentInfo.currentUser.defaultPaymentMethod.id;
    const shippingAddressId =
      getUserShippingAndPaymentInfo.currentUser.defaultShippingAddress.id;
    const buyPYTsetPriceSpot = await purchasePYTsetPrice(
      auth,
      breakId,
      breakSpotIdList,
      paymentMethodId,
      shippingAddressId
    );
    return buyPYTsetPriceSpot;
  };

  buyAuctionSpot = async (account: Account, live: string, bidCent: string) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    const liveId = (await getLiveId(live)).liveStreamByName.id;
    const breakId = (await getLivestream(liveId)).liveStream
      .currentBreakSpotAuction?.id;
    const spotName = (await getLivestream(liveId)).liveStream
      .currentBreakSpotAuction.breakSpot.label;
    await bid(auth, bidCent, breakId);
    return spotName;
  };

  assertSpotByApi = async (
    account: Account,
    liveName: string,
    pricingType: string,
    selectionType: string
  ) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    let endCursor = undefined;
    let i = 0;
    let success;
    while (i < 10) {
      let Reslist = [];
      const getOrdersRes = await getUseroOrders(auth, endCursor);
      const edgeslist = getOrdersRes.currentUser.orders.edges;
      const expectRes = { liveName, pricingType, selectionType };
      endCursor = getOrdersRes.currentUser.orders.pageInfo.endCursor;
      for (const item of edgeslist) {
        const liveName = item.node.break.liveStream.name;
        const pricingType = item.node.break.pricingType;
        const selectionType = item.node.break.selectionType;
        Reslist.push({ liveName, pricingType, selectionType });
      }
      if (JSON.stringify(Reslist).includes(JSON.stringify(expectRes))) {
        return true;
      }
      i++;
    }
    return false;
  };

  participeGames = async (account: Account, liveName: string) => {
    const tokens = await getTokens(account);
    const auth = "Bearer " + tokens.login.accessToken;
    const liveIdRes = await getLiveId(liveName);
    const liveId = liveIdRes.liveStreamByName.id;
    const liveStream = await getClientLivestream(auth, liveId);
    if (liveStream.liveStream.currentBreakGame) {
      const breakSlosts =
        liveStream.liveStream.currentBreakGame.break.breakSlots;
      let ids = [];
      const breakId = liveStream.liveStream.currentBreakGame.break.id;
      for (const spot of breakSlosts) {
        ids.push(spot.id);
      }
      const getUserShippingAndPaymentInfo =
        await getUserShippingAndPayment(auth);
      const paymentMethodId =
        getUserShippingAndPaymentInfo.currentUser.defaultPaymentMethod.id;
      const shippingAddressId =
        getUserShippingAndPaymentInfo.currentUser.defaultShippingAddress.id;
      for (const id of ids) {
        await purchasePYTsetPrice(
          auth,
          breakId,
          id,
          paymentMethodId,
          shippingAddressId
        );
      }
    }
  };
}
