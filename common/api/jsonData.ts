import { Query } from "@utils/api";

export class JsonData {
  getToken = (account: { email: any; password: any }): Query => {
    const variables = {
      input: {
        emailOrUsername: account.email,
        password: account.password,
      },
    };
    const query =
      "mutation ($input: LoginInput!) { login(input: $input) { accessToken refreshToken } }";
    return { query, variables };
  };

  getLiveId = (live: string): Query => {
    return { query: `{liveStreamByName(name: "${live}"){id}}` };
  };

  getLivestream = (id: string): Query => {
    return {
      operationName: "GetLiveStream",
      query:
        "query GetLiveStream($id: UUID!, $roomName: String!) { liveStream(id: $id) { __typename channel { __typename id name shop { __typename id name logoUrl isFollowed followerCount } isFollowed logoUrl } staffers { __typename id avatarUrl username } isFollowed coverImageUrl ivsStreamToken livekitStreamToken(publish: false, roomName: $roomName, subscribe: true) streamingProvider name leagues { __typename ...SharedLiveStreamLeague } poll { __typename userVotes } ...SharedLiveStream } }\nfragment SharedLiveStreamLeague on League { __typename id name }\nfragment SharedLiveStream on LiveStream { __typename id status startsAt endsAt currentBreak { __typename ...SharedBreak } breaks { __typename ...SharedBreak ...SharedBreakOnHit } viewers celebration currentBreakSpotAuction { __typename ...SharedAuction } randomization { __typename breakSpots { __typename id label logoUrl } randomizationResult } }\nfragment SharedBreak on Break { __typename id minimumBidInCents pricingType selectionType title status breakTemplate { __typename id label } breakSlots { __typename id user { __typename id username } label previousPriceInCents previousPriceDisplay priceDiscountPercentage priceInCents priceDisplay rawPriceDisplay rawPriceInCents logoUrl } breakSlotsCounts { __typename available claimed total } breakProducts { __typename product { __typename id name imagePaths { __typename main } category packsPerBox checklistUrl } quantity } }\nfragment SharedBreakOnHit on Break { __typename cards { __typename avgPriceInCentsDisplay athleteName imageUrl title } }\nfragment SharedAuction on BreakSpotAuction { __typename id breakMechanicType breakMechanicThresholdInCents breakMechanicExpiration breakMechanicRevealedSpots { __typename id logoUrl label } endsAt highBidInCents status minimumBidInCents nextBidInCents initialDurationInSeconds highBidder { __typename id username } break { __typename ...SharedBreak } breakSpot { __typename id label priceInCents spotNumber logoUrl } }",
      variables: {
        id: id,
        roomName: id,
      },
    };
  };

  enterGiveaway = (id: string): Query => {
    return {
      operationName: "enterGiveawayMutation",
      query:
        "mutation enterGiveawayMutation($giveawayId: UUID!) { enterGiveaway(giveawayId: $giveawayId) { __typename successful result { __typename giveaway { __typename id participantCount hasUserEntered } } messages { __typename message } } }",
      variables: {
        giveawayId: id,
      },
    };
  };

  bid = (bidCents: string, id: string): Query => {
    return {
      operationName: "bid",
      query:
        "mutation bid($input: BidInput!) { bid(input: $input) { __typename successful messages { __typename code message } } }",
      variables: {
        input: {
          bidInCents: parseInt(bidCents) * 100,
          id: id,
        },
      },
    };
  };

  purchaseRandomSpot = (
    breakId: string,
    paymentMethodId: string,
    shippingAddressId: string,
    quantity: number
  ): Query => {
    return {
      operationName: "purchaseRandomSpot",
      query:
        "mutation purchaseRandomSpot($input: PurchaseRandomSpotInput!) { purchaseRandomSpot(input: $input) { __typename messages { __typename code message } result { __typename messages { __typename code text } order { __typename id break { __typename id breakSlots { __typename priceInCents user { __typename id } } breakSlotsCounts { __typename available total } } isFirstOrder } } } }",
      variables: {
        input: {
          applyRewardsBalance: false,
          breakId: breakId,
          paymentMethodId: paymentMethodId,
          quantity: quantity,
          shippingAddressId: shippingAddressId,
        },
      },
    };
  };

  getUserShippingAndPayment = (): Query => {
    return {
      operationName: "getUserShippingAndPayment",
      query:
        "query getUserShippingAndPayment { currentUser { __typename ...UserBuyEligibility } }\nfragment UserBuyEligibility on CurrentUser { __typename defaultPaymentMethod { __typename id } defaultShippingAddress { __typename id } }",
    };
  };

  purchasePYTsetPrice = (
    breakId: string,
    breakSpotIdList: string,
    paymentMethodId: string,
    shippingAddressId: string
  ): Query => {
    return {
      operationName: "purchaseSpot",
      query:
        "mutation purchaseSpot($input: PurchaseSpotInput!) { purchaseSpot(input: $input) { __typename messages { __typename code message } result { __typename id insertedAt breakSpots { __typename label logoUrl priceDisplay } break { __typename id title liveStream { __typename channel { __typename shop { __typename name } } } products { __typename imagePaths { __typename main } } breakSlots { __typename priceInCents user { __typename id } } breakSlotsCounts { __typename available total } } isFirstOrder discountValueDisplay discountValueInCents } } }",
      variables: {
        input: {
          applyRewardsBalance: false,
          breakId: breakId,
          breakSpotIdList: [breakSpotIdList],
          paymentMethodId: paymentMethodId,
          shippingAddressId: shippingAddressId,
        },
      },
    };
  };

  orderPage = (edge?: string): Query => {
    return {
      operationName: "getCurrentUserPurchases",
      variables: edge ? { filter: {}, after: edge } : { filter: {} },
      query:
        "query getCurrentUserPurchases($after: String, $filter: OrderFilter) {\n  currentUser {\n    id\n    orders(first: 10, after: $after, filter: $filter) {\n      count\n      edges {\n        cursor\n        node {\n          id\n          insertedAt\n          status\n          totalChargeValueDisplay\n          break {\n            id\n            title\n            liveStream {\n              id\n              name\n              status\n              channel {\n                shop {\n                  id\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            selectionType\n            pricingType\n            __typename\n          }\n          breakSpots {\n            id\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
    };
  };

  getUserOrderById = (id: string): Query => {
    return {
      operationName: "getUserOrderById",
      variables: {
        id: id,
      },
      query:
        "query getUserOrderById($id: UUID) {\n  currentUser {\n    orders(id: $id) {\n      __typename\n      edges {\n        node {\n          ...OrderInfo\n          __typename\n        }\n        __typename\n      }\n    }\n    __typename\n  }\n}\n\nfragment OrderInfo on BreakOrder {\n  id\n  promoCode\n  discountValueDisplay\n  discountValueInCents\n  shippingAddress {\n    name\n    line1\n    line2\n    city\n    state\n    postalCode\n    __typename\n  }\n  break {\n    title\n    id\n    selectionType\n    breakSlotsCounts {\n      total\n      __typename\n    }\n    pricingType\n    liveStream {\n      id\n      name\n      channel {\n        shop {\n          name\n          id\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  breakSpots {\n    id\n    label\n    priceInCents\n    priceDisplay\n    logoUrl\n    __typename\n  }\n  amountInCents\n  shippingValueInCents\n  totalSalesTaxInCents\n  subTotalValueDisplay\n  totalSalesTaxDisplay\n  shippingValueDisplay\n  totalChargeValueDisplay\n  productValueDisplay\n  insertedAt\n  paymentMethod {\n    id\n    brand\n    last4\n    __typename\n  }\n  trackingNumber\n  trackingStatus\n  trackingUrlProvider\n  orderCode\n  carrierProvider\n  status\n  __typename\n}",
    };
  };

  addressCreate = (input: {}): Query => {
    return {
      operationName: "addressCreate",
      query:
        "mutation addressCreate($input: AddressCreateInput!) { addressCreate(input: $input) { __typename successful messages { __typename code field message template options { __typename key value } } result { __typename id } } }",
      variables: {
        input: input,
      },
    };
  };

  addressUpdate = (defaultShippingAddressId: string): Query => {
    return {
      operationName: "accountUpdate",
      query:
        "mutation accountUpdate($input: AccountUpdateInput!) { accountUpdate(input: $input) { __typename successful messages { __typename message code field template } } }",
      variables: {
        input: {
          defaultShippingAddressId: defaultShippingAddressId,
        },
      },
    };
  };

  getUserAddresses = (): Query => {
    return {
      operationName: "getUserAddresses",
      query:
        "query getUserAddresses { currentUser { __typename id defaultShippingAddress { __typename ...SharedAddress } addresses { __typename ...SharedAddress } } }\nfragment SharedAddress on Address { __typename id name line1 line2 city state postalCode }",
    };
  };

  addressDeleteMutation = (id: string): Query => {
    return {
      operationName: "addressDeleteMutation",
      query:
        "mutation addressDeleteMutation($input: AddressDeleteInput!) { addressDelete(input: $input) { __typename successful } }",
      variables: {
        input: {
          id: id,
        },
      },
    };
  };

  getUserPaymentMethods = (): Query => {
    return {
      operationName: "getUserPaymentMethods",
      query:
        "query getUserPaymentMethods { currentUser { __typename id defaultPaymentMethod { __typename ...SharedPayment } paymentMethods { __typename ...SharedPayment } } }\nfragment SharedPayment on PaymentMethod { __typename id brand expMonth expYear last4 }",
    };
  };

  getPollsAndOptionsId = (liveStreamID: string): Query => {
    return {
      operationName: "GetPollsAndOptionsId",
      query:
        "query GetPollsAndOptionsId ($id: UUID!) { getPolls(input: { id: $id }) { __typename polls { __typename id description options { __typename id title votePercentage { percentageDisplay } } } } }",
      variables: {
        id: liveStreamID,
      },
    };
  };
  participatePoll = (pollId: string, optionId: string): Query => {
    return {
      operationName: "VoteCastMutation",
      variables: {
        input: {
          pollId: pollId,
          optionIds: [optionId],
        },
      },
      query:
        "mutation VoteCastMutation($input: VoteCastInput!) {\n  voteCast(input: $input) {\n    messages {\n      code\n      field\n      message\n      __typename\n    }\n    result {\n      status\n      __typename\n    }\n    successful\n    __typename\n  }\n}",
    };
  };

  mainliveStream = (id: string): Query => {
    return {
      operationName: "mainliveStreamQuery",
      variables: {
        id: id,
        isUserLoggedIn: true,
      },
      query:
        "query mainliveStreamQuery($id: UUID, $isUserLoggedIn: Boolean!) {\n  liveStream(id: $id) {\n    __typename\n    id\n    ...SharedLiveStream\n    poll {\n      ...SharedGetPoll\n      userVotes @include(if: $isUserLoggedIn)\n      __typename\n    }\n  }\n}\n\nfragment SharedLiveStream_minimum_information on LiveStream {\n  __typename\n  id\n  streamingProvider\n  name\n  status\n  description\n  startsAt\n  publishedAt\n}\n\nfragment SharedBreakSlot on BreakSlot {\n  __typename\n  id\n  user {\n    __typename\n    id\n    username\n  }\n  label\n  priceInCents\n  priceDisplay\n  rawPriceDisplay\n  slotNumber\n  logoUrl\n  previousPriceDisplay\n  previousPriceInCents\n  priceDiscountPercentage\n  labelAbbreviation\n  rawPriceInCents\n}\n\nfragment SharedBreak on Break {\n  __typename\n  id\n  minimumBidInCents\n  pricingType\n  selectionType\n  title\n  status\n  description\n  breakSlots {\n    ...SharedBreakSlot\n    __typename\n  }\n  breakSlotsCounts {\n    __typename\n    available\n    claimed\n    total\n  }\n  breakProducts {\n    product {\n      __typename\n      id\n      name\n      imagePaths {\n        __typename\n        main\n      }\n      category\n      packsPerBox\n      checklistUrl\n    }\n    quantity\n    __typename\n  }\n  breakTemplate {\n    id\n    label\n    __typename\n  }\n}\n\nfragment SimpleSharedBreakSpot on BreakSpot {\n  id\n  label\n  priceInCents\n  spotNumber\n  logoUrl\n  __typename\n}\n\nfragment SharedAuction on BreakSpotAuction {\n  id\n  breakMechanicType\n  breakMechanicThresholdInCents\n  breakMechanicExpiration\n  breakMechanicRevealedSpots {\n    ...SimpleSharedBreakSpot\n    __typename\n  }\n  endsAt\n  highBidInCents\n  status\n  minimumBidInCents\n  nextBidInCents\n  initialDurationInSeconds\n  highBidder {\n    id\n    username\n    __typename\n  }\n  breakSpot {\n    ...SimpleSharedBreakSpot\n    __typename\n  }\n  trustedUsersOnly\n  disallowOutbiddingSelf\n  __typename\n}\n\nfragment SharedBreak_THIN on Break {\n  __typename\n  id\n  pricingType\n  selectionType\n  title\n  status\n  description\n  breakSlotsCounts {\n    __typename\n    available\n    claimed\n    total\n  }\n  breakTemplate {\n    id\n    label\n    __typename\n  }\n}\n\nfragment SharedCurrentBreakGame on BreakGame {\n  break {\n    __typename\n    ...SharedBreak\n  }\n  endsAt\n  gameType\n  giveawayTitle\n  id\n  rewardType\n  status\n  __typename\n}\n\nfragment SharedPollOption on Option {\n  description\n  id\n  title\n  voteCount\n  votePercentage {\n    percentageDisplay\n    percentage\n    __typename\n  }\n  __typename\n}\n\nfragment SharedLiveStream on LiveStream {\n  ...SharedLiveStream_minimum_information\n  viewers\n  celebration\n  isFollowed\n  currentBreak {\n    __typename\n    ...SharedBreak\n  }\n  currentBreakSpotAuction {\n    ...SharedAuction\n    __typename\n  }\n  breaks {\n    __typename\n    ...SharedBreak_THIN\n  }\n  giveaway {\n    id\n    audience\n    enteredUsernames\n    participantCount\n    status\n    title\n    hasUserEntered\n    winner {\n      id\n      username\n      __typename\n    }\n    __typename\n  }\n  randomization {\n    breakSpots {\n      id\n      label\n      logoUrl\n      __typename\n    }\n    randomizationResult\n    randomizationType\n    __typename\n  }\n  currentBreakGame {\n    __typename\n    ...SharedCurrentBreakGame\n  }\n  __typename\n}\n\nfragment SharedGetPoll on PollWithUserVotes {\n  description\n  endsAt\n  id\n  options {\n    ...SharedPollOption\n    __typename\n  }\n  status\n  title\n  totalVotes\n  type\n  winningOption {\n    ...SharedPollOption\n    __typename\n  }\n  __typename\n}",
    };
  };

  getUserOderById = (id: string): Query => {
    return {
      operationName: "getUserOrderById",
      variables: {
        filter: {
          id: id,
        },
      },
      query:
        "query getUserOrderById($filter: OrderFilter) {\n  currentUser {\n    orders(filter: $filter) {\n      __typename\n      edges {\n        node {\n          ...OrderInfo\n          __typename\n        }\n        __typename\n      }\n    }\n    __typename\n  }\n}\n\nfragment OrderInfo on BreakOrder {\n  id\n  promoCode\n  discountValueDisplay\n  discountValueInCents\n  shippingAddress {\n    name\n    line1\n    line2\n    city\n    state\n    postalCode\n    __typename\n  }\n  break {\n    title\n    id\n    selectionType\n    breakSlotsCounts {\n      total\n      __typename\n    }\n    pricingType\n    liveStream {\n      id\n      name\n      channel {\n        shop {\n          name\n          id\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  breakSpots {\n    id\n    label\n    priceInCents\n    priceDisplay\n    logoUrl\n    __typename\n  }\n  amountInCents\n  shippingValueInCents\n  totalSalesTaxInCents\n  subTotalValueDisplay\n  totalSalesTaxDisplay\n  shippingValueDisplay\n  totalChargeValueDisplay\n  productValueDisplay\n  insertedAt\n  paymentMethod {\n    id\n    brand\n    last4\n    __typename\n  }\n  trackingNumber\n  trackingStatus\n  trackingUrlProvider\n  orderCode\n  carrierProvider\n  status\n  __typename\n}",
    };
  };
}
