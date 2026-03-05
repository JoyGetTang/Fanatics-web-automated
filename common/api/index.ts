import { Api } from "@utils/api";
import { JsonData } from "./jsonData";

const api = new Api();
const json = new JsonData();

interface Tokens {
  login: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface Account {
  email: string;
  password: string;
}

interface LivestreamId {
  liveStreamByName: {
    id: string;
  };
}

interface breakSlot {
  id: string;
  label: string;
  priceInCents: number | string;
  previousPriceInCents: any;
  logoUrl: string;
  previousPriceDisplay: string;
  rawPriceInCents: string | number;
  rawPriceDisplay: string;
  priceDisplay: string;
  priceDiscountPercentage: any;
  __typename: BreakSlot;
  user: null;
}

interface CurrentBreakSpotAuction {
  id: string;
  initialDurationInSeconds: 15;
  breakMechanicExpiration: null;
  breakMechanicType: null;
  highBidInCents: null;
  breakMechanicThresholdInCents: null;
  break: any;
  breakMechanicRevealedSpots: [];
  endsAt: string;
  highBidder: any;
  nextBidInCents: string | number;

  breakSpot: {
    logoUrl: string;
    __typename: "BreakSpot";
    id: string;
    label: string;
    priceInCents: any;
    spotNumber: number;
  };

  __typename: "BreakSpotAuction";
  minimumBidInCents: number;
  status: string;
}

interface LiveStream {
  liveStream: {
    __typename: string;
    breaks: [[Object]];
    celebration: null;
    channel: {
      __typename: string;
      id: string;
      isFollowed: boolean;
      name: string;
      shop: [Object];
    };
    coverImageUrl: string;
    currentBreak: {
      __typename: string;
      breakProducts: [Array<any>];
      breakSlots: [any];
      breakSlotsCounts: [Object];
      breakTemplate: [Object];
      description: null | string;
      id: string;
      minimumBidInCents: null | string;
      pricingType: string;
      products: [Array<any>];
      selectionType: string;
      status: string;
      title: string;
    };
    currentBreakSpotAuction: any | CurrentBreakSpotAuction;
    description: null | string;
    giveaway: Giveaway | null;
    id: string;
    isFollowed: boolean;
    ivsStreamToken: string;
    name: string;
    phenixStreamToken: string;
    randomization: null;
    staffers: [[Object]];
    startsAt: string;
    status: string;
    streamingProvider: string;
    viewers: number | null;
  };
}

interface CurrentBreakGame {
  break: {
    breakProducts: [Object];
    breakSlots: [any];
    breakSlotsCounts: Object;
    breakTemplate: [Object];
    description: any;
    id: string;
    minimumBidInCents: any;
    pricingType: "SET_PRICE";
    selectionType: "PICK_YOUR_SLOT";
    status: "READY";
    title: "pickYourSpotSetPrice";
    __typename: "Break";
  };
  endsAt: string;
  gameType: string;
  giveawayTitle: string;
  id: string;
  rewardType: "GIVEAWAY";
  status: "ACTIVE";
  __typename: "BreakGame";
}

interface ClientLiveStream {
  liveStream: {
    __typename: string;
    breaks: [[Object]];
    celebration: null;
    currentBreak: {
      __typename: string;
      breakProducts: [Array<any>];
      breakSlots: [any];
      breakSlotsCounts: [Object];
      breakTemplate: [Object];
      description: null | string;
      id: string;
      minimumBidInCents: null | string;
      pricingType: string;
      products: [Array<any>];
      selectionType: string;
      status: string;
      title: string;
    };
    currentBreakGame: null | CurrentBreakGame;
    currentBreakSpotAuction: any | CurrentBreakSpotAuction;
    description: null | string;
    giveaway: Giveaway | null;
    id: string;
    isFollowed: boolean;
    ivsStreamToken: string;
    livekitStreamToken: string;
    name: string;
    poll: any;
    pubulishedAt: string;
    phenixStreamToken: string;
    randomization: any;
    // staffers: [[Object]];
    startsAt: string;
    status: string;
    streamingProvider: string;
    viewers: number | null;
  };
}

interface Giveaway {
  __typename: string;
  audience: string;
  enteredUsernames: [];
  id: string;
  participantCount: number;
  status: string;
  title: string;
  winner: null | string;
}

interface EnterGiveaway {
  enterGiveaway: {
    __typename: string;
    messages: [];
    result: {
      __typename: "EnterGiveawayResponse";
      giveaway: {
        __typename: "Giveaway";
        hasUserEntered: boolean;
        id: string;
        participantCount: number;
      };
    };
    successful: boolean;
  };
}

interface Bid {
  bid: {
    message: [];
    successful: boolean;
    __typename: "BidPayload";
  };
}

interface BreakSlot {
  user: {
    id: string;
    __typename: "BreakUser";
  };
  priceInCents: number;
  __typename: "BreakSlot";
}

interface PurchaseRandomSpot {
  purchaseRandomSpot: {
    messages: [];
    result: {
      messages: null;
      order: {
        isFirstOrder: boolean;
        __typename: "BreakOrder";
        break: {
          breakSlotsCounts: {
            total: number;
            available: number;
            __typename: "BreakSlotsCounts";
          };
          __typename: "Break";
          breakSlots: BreakSlot[];
          id: string;
        };
        id: string;
      };
      __typename: "BreakOrderReponse";
    };
    __typename: "PurchaseRandomSpotPayload";
  };
}

interface GetUserShippingAndPayment {
  currentUser: {
    defaultPaymentMethod: {
      id: string;
      __typename: "PaymentMethod";
    };
    defaultShippingAddress: {
      id: string;
      __typename: "Address";
    };
    __typename: "CurrentUser";
  };
}

interface PurchaseSpot {
  purchaseSpot: {
    messages: [];
    result: {
      discountValueInCents: any;
      id: string;
      breakSpots: [
        {
          logoUrl: string;
          __typename: "BreakSlot";
          label: string;
          priceDisplay: any;
        },
      ];
      discountValueDisplay: string;
      insertedAt: string;
      break: {
        breakSlotsCounts: {
          total: any;
          available: any;
          __typename: "BreakSlotsCounts";
        };
        products: [
          {
            imagePaths: any;
            __typename: "Product";
          },
        ];
        id: string;
        liveStream: {
          channel: {
            shop: {
              name: string;
              __typename: "Shop";
            };
            __typename: "Channel";
          };
          __typename: "LiveStream";
        };
        title: string;
        __typename: "Break";
        breakSlots: any[];
      };
      __typename: "BreakOrder";
      isFirstOrder: true;
    };
    __typename: "PurchaseSpotPayload";
  };
}

interface PurchaseSpotOnClient {
  purchaseSpot: {
    messages: [];
    result: any;
    successful: boolean;
    __typename: "PurchaseSpotPayload";
  };
}

interface OdersEdges {
  __typename: "BreakOrderEdge";
  cursor: string;
  node: {
    __typename: "BreakOrder";
    break: {
      __typename: "Break";
      id: string;
      liveStream: {
        __typename: "LiveStream";
        channel: {
          __typename: "Channel";
          shop: {
            __typename: "Shop";
            id: string;
          };
        };
        id: string;
        name: string;
        status: string;
      };
      pricingType: string;
      selectionType: string;
      title: string;
    };
    breakSpots: [
      {
        __typename: "BreakSlot";
        id: string;
      },
    ];
    id: string;
    insertedAt: string;
    status: string;
    totalChargeValueDisplay: string;
  };
}

interface GetUserOrders {
  currentUser: {
    __typename: "CurrentUser";
    id: string;
    orders: {
      __typename: "BreakOrderConnection";
      edges: [OdersEdges];
      pageInfo: {
        __typename: "PageInfo";
        endCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
      };
    };
  };
}

interface GetUserOrderById {
  currentUser: {
    __typename: "CurrentUser";
    orders: {
      __typename: "BreakOrderConnection";
      edges: [
        {
          __typename: "BreakOrderEdge";
          node: {
            __typename: "BreakOrder";
            amountInCents: number;
            break: {
              __typename: "Break";
              breakSlotsCounts: {
                __typename: "BreakSlotsCounts";
                total: number;
              };
              id: string;
              liveStream: {
                __typename: "LiveStream";
                channel: {
                  __typename: "Channel";
                  shop: {
                    __typename: "Shop";
                    id: string;
                    name: string;
                  };
                };
                id: string;
                name: string;
              };
              pricingType: string;
              selectionType: string;
              title: string;
            };
            breakSpots: [
              {
                __typename: "BreakSlot";
                id: string;
                label: string;
                logoUrl: string;
                priceDisplay: null;
                priceInCents: null;
              },
            ];
            carrierProvider: null;
            discountValueDisplay: string;
            discountValueInCents: 0;
            id: string;
            insertedAt: string;
            orderCode: string;
            paymentMethod: {
              __typename: "PaymentMethod";
              brand: string;
              id: string;
              last4: string;
            };
            productValueDisplay: string;
            promoCode: null;
            shippingAddress: {
              __typename: "Address";
              city: string;
              line1: string;
              line2: any;
              name: string;
              postalCode: string;
              state: string;
            };
            shippingValueDisplay: string;
            shippingValueInCents: number;
            status: string;
            subTotalValueDisplay: string;
            totalChargeValueDisplay: string;
            totalSalesTaxDisplay: string;
            totalSalesTaxInCents: number;
            trackingNumber: any;
            trackingStatus: any;
            trackingUrlProvider: any;
          };
        },
      ];
    };
  };
}

interface AddressInput {
  city: string;
  line1: string;
  line2: string;
  name: string;
  postalCode: string;
  state: string;
}

interface Address {
  state: string;
  city: string;
  id: string;
  line2: any;
  postalCode: string;
  line1: string;
  __typename: "Address";
  name: string;
}

interface Addresses {
  currentUser: {
    __typename: "CurrentUser";
    defaultShippingAddress: any;
    addresses: [Address];
    id: string;
  };
}

interface AddressCreate {
  addressCreate: {
    messages: [];
    __typename: "AddressChangePayload";
    result: {
      id: string;
      __typename: "Address";
    };
    successful: boolean;
  };
}

interface AccountUpdate {
  accountUpdate: {
    messages: [];
    successful: boolean;
    __typename: "AccountUpdatePayload";
  };
}

interface AddressDelete {
  addressDelete: {
    successful: boolean;
    __typename: "AddressChangePayload";
  };
}

interface PaymentMethod {
  __typename: "PaymentMethod";
  brand: string;
  expMonth: string;
  expYear: string;
  id: string;
  last4: string;
}
interface PaymentMethods {
  currentUser: {
    __typename: "CurrentUser";
    id: string;
    defaultPaymentMethod: any;
    paymentMethods: [PaymentMethod];
  };
}

type option = {
  __typename: "Option";
  id: string;
  title: string;
  votePercentage: { percentageDisplay: string };
};

type Poll = {
  __typename: "PollWithUserVotes";
  description: string;
  id: string;
  options: [option];
};

interface GetPollsAndOptionId {
  getPolls: {
    __typename: "GetPollsResponse";
    polls: [Poll];
  };
}

interface ParticipatePoll {
  voteCast: {
    __typename: "VoteCastResponsePayload";
    successful: boolean;
  };
}

interface CurrentUser {
  currentUser: {
    __typename: "CurrentUser";
    orders: {
      __typename: "BreakOrderConnection";
      edges: [
        {
          __typename: "BreakOrderEdge";
          node: {
            __typename: "BreakOrder";
            amountInCents: Number;
            break: {
              __typename: "Break";
              breakSlotsCounts: {
                __typename: "BreakSlotsCounts";
                total: Number;
              };
              id: string;
              liveStream: {
                __typename: "LiveStream";
                channel: {
                  __typename: "Channel";
                  shop: {
                    __typename: "Shop";
                    id: string;
                    name: string;
                  };
                };
                id: string;
                name: string;
              };
              pricingType: string;
              selectionType: string;
              title: string;
            };
            breakSpots: [
              {
                __typename: "BreakSlot";
                id: string;
                label: string;
                logoUrl: null;
                priceDisplay: string;
                priceInCents: null | string;
              },
            ];
            carrierProvider: null;
            discountValueDisplay: string;
            discountValueInCents: Number;
            id: string;
            insertedAt: string;
            orderCode: string;
            paymentMethod: {
              __typename: "PaymentMethod";
              brand: string;
              id: string;
              last4: string;
            };
            productValueDisplay: string;
            promoCode: null | string;
            shippingAddress: {
              __typename: "Address";
              city: string;
              line1: string;
              line2: null | string;
              name: string;
              postalCode: string;
              state: string;
            };
            shippingValueDisplay: string;
            shippingValueInCents: Number;
            status: "Preparing for shipment";
            subTotalValueDisplay: string;
            totalChargeValueDisplay: string;
            totalSalesTaxDisplay: string;
            totalSalesTaxInCents: Number;
            trackingNumber: null | string;
            trackingStatus: null | string;
            trackingUrlProvider: null | string;
          };
        },
      ];
    };
  };
}

export const getTokens = async (account: Account): Promise<Tokens> => {
  return await api.post(undefined, json.getToken(account));
};

export const getLiveId = async (live: string): Promise<LivestreamId> => {
  return await api.post(undefined, json.getLiveId(live));
};

export const getLivestream = async (id: string): Promise<LiveStream> => {
  return await api.post(undefined, json.getLivestream(id));
};

export const getGiveawayId = async (
  auth: string,
  id: string
): Promise<Giveaway> => {
  return (await api.post(auth, json.getLivestream(id))).liveStream.giveaway;
};

export const enterGiveaway = async (
  auth: string,
  id: string
): Promise<EnterGiveaway> => {
  return await api.post(auth, json.enterGiveaway(id));
};

export const getSpotId = async (auth: string, id: string): Promise<string> => {
  return (await api.post(auth, json.getLivestream(id))).liveStream
    .currentBreakSpotAuction.id;
};

export const bid = async (
  auth: string,
  bidCents: string,
  id: string
): Promise<Bid> => {
  return await api.post(auth, json.bid(bidCents, id));
};

export const purchaseRandomSpot = async (
  auth: string,
  breakId: string,
  paymentMethodId: string,
  shippingAddressId: string,
  quantity: number
): Promise<PurchaseRandomSpot> => {
  return await api.post(
    auth,
    json.purchaseRandomSpot(
      breakId,
      paymentMethodId,
      shippingAddressId,
      quantity
    )
  );
};

export const getUserShippingAndPayment = async (
  auth: string
): Promise<GetUserShippingAndPayment> => {
  return await api.post(auth, json.getUserShippingAndPayment());
};

export const purchasePYTsetPrice = async (
  auth: string,
  breakId: string,
  breakSpotIdList: string,
  paymentMethodId: string,
  shippingAddressId: string
): Promise<PurchaseSpot> => {
  return await api.post(
    auth,
    json.purchasePYTsetPrice(
      breakId,
      breakSpotIdList,
      paymentMethodId,
      shippingAddressId
    )
  );
};

export const purchaseGame = async (
  auth: string,
  breakId: string,
  breakSpotIdList: string,
  paymentMethodId: string,
  shippingAddressId: string
): Promise<PurchaseSpotOnClient> => {
  return await api.post(
    auth,
    json.purchasePYTsetPrice(
      breakId,
      breakSpotIdList,
      paymentMethodId,
      shippingAddressId
    )
  );
};

export const getUseroOrders = async (
  auth: string,
  edge?: string
): Promise<GetUserOrders> => {
  return await api.post(auth, json.orderPage(edge));
};

export const getUserOrderById = async (
  auth: string,
  id: string
): Promise<GetUserOrderById> => {
  return await api.post(auth, json.getUserOrderById(id));
};

export const getUserAddresses = async (auth: string): Promise<Addresses> => {
  return await api.post(auth, json.getUserAddresses());
};

export const addressCreate = async (
  auth: string,
  input: AddressInput
): Promise<AddressCreate> => {
  return await api.post(auth, json.addressCreate(input));
};

export const updateAddress = async (
  auth: string,
  defaultShippingAddressId: string
): Promise<AccountUpdate> => {
  return await api.post(auth, json.addressUpdate(defaultShippingAddressId));
};

export const addressDeleteMutation = async (
  auth: string,
  id: string
): Promise<AddressDelete> => {
  return await api.post(auth, json.addressDeleteMutation(id));
};

export const getUserPaymentMethods = async (
  auth: string
): Promise<PaymentMethods> => {
  return await api.post(auth, json.getUserPaymentMethods());
};

export const getPollsAndOptionsId = async (
  auth: string,
  LiveStreamId: string
): Promise<GetPollsAndOptionId> => {
  return await api.post(auth, json.getPollsAndOptionsId(LiveStreamId));
};

export const participatePoll = async (
  auth: string,
  pollsId: string,
  optionId: string
): Promise<ParticipatePoll> => {
  return await api.post(auth, json.participatePoll(pollsId, optionId));
};

export const getClientLivestream = async (
  auth: string,
  Id: string
): Promise<ClientLiveStream> => {
  return await api.post(auth, json.mainliveStream(Id));
};

export const getPolls = async (
  auth: string,
  Id: string
): Promise<ClientLiveStream> => {
  return await api.post(auth, json.mainliveStream(Id));
};

export const getOrder = async (
  auth: string,
  Id: string
): Promise<CurrentUser> => {
  return await api.post(auth, json.getUserOderById(Id));
};
