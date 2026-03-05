export interface BreaksListings {
  randomAuction: ListingType[];
  randomSetPrice: ListingType[];
  pickYourSpotSetPrice: ListingType[];
  pickYourSpotAuction: ListingType[];
}

interface ListingType {
  origin: Listing;
  changeTo: Listing;
}

interface BaseType {
  origin: Listing;
}

export interface ProductType {
  name: string;
  newProduct?: {
    year: string;
    manufacturer: string;
    league: string;
    newName: string;
    link?: string;
  };
  cost: string;
  quality?: string;
}

export interface Listing {
  listingTitle: string;
  listingName: string;
  assignments: "random" | "pickYourSpot";
  sellType: "set price" | "auction";
  pricePerSpot?: string;
  assignPrices?: string;
  minbid?: string;
  breakExtras?: {
    extendedBidding?: boolean;
    extrasType?:
      | {
          extrasType: "stashOrPass";
          miniRequired: string;
        }
      | {
          extrasType: "pick2Choose1";
          miniRequired: string;
        }
      | {
          extrasType: "None";
        };
  };
  product?: ProductType;
}

export interface BaseListings {
  randomAuction: BaseType[];
  randomSetPrice: BaseType[];
  pickYourSpotSetPrice: BaseType[];
  pickYourSpotAuction: BaseType[];
}

export const BaseListings: BaseListings = {
  randomSetPrice: [
    {
      origin: {
        listingTitle: "random set",
        listingName: "NBA 30 Team",
        assignments: "random",
        sellType: "set price",
        pricePerSpot: "100",
      },
    },
  ],
  randomAuction: [
    {
      origin: {
        listingTitle: "random auction",
        listingName: "NBA 30 Team",
        assignments: "random",
        sellType: "auction",
        minbid: "100",
      },
    },
  ],
  pickYourSpotSetPrice: [
    {
      origin: {
        listingTitle: "pick set",
        listingName: "NBA 30 Team",
        assignments: "pickYourSpot",
        sellType: "set price",
        assignPrices: "100",
      },
    },
  ],
  pickYourSpotAuction: [
    {
      origin: {
        listingTitle: "pick auction",
        listingName: "NBA 30 Team",
        assignments: "pickYourSpot",
        sellType: "auction",
        minbid: "100",
      },
    },
  ],
};

export const Listings: BreaksListings = {
  randomAuction: [
    {
      origin: {
        listingTitle: "RaNoBreakExtras",
        listingName: "NBA 30 Team",
        minbid: "100",
        assignments: "random",
        sellType: "auction",
      },
      changeTo: {
        listingTitle: "changeRaNoBreakExtras",
        listingName: "MLB 30 Team",
        assignments: "random",
        sellType: "auction",
        minbid: "999",
        breakExtras: {
          extrasType: {
            extrasType: "stashOrPass",
            miniRequired: "100",
          },
        },
      },
    },
    {
      origin: {
        listingTitle: "RaStashOrPass",
        listingName: "NBA 30 Team",
        minbid: "100",
        assignments: "random",
        sellType: "auction",
        breakExtras: {
          extrasType: {
            extrasType: "stashOrPass",
            miniRequired: "100",
          },
        },
      },
      changeTo: {
        listingTitle: "changRaStashOrPass",
        listingName: "MLB 30 Team",
        minbid: "999",
        assignments: "random",
        sellType: "auction",
        breakExtras: {
          extrasType: {
            extrasType: "None",
          },
        },
      },
    },
    {
      origin: {
        listingTitle: "RaPick2Choose1",
        listingName: "NBA 30 Team",
        minbid: "100",
        assignments: "random",
        sellType: "auction",
        breakExtras: {
          extrasType: {
            extrasType: "pick2Choose1",
            miniRequired: "100",
          },
        },
      },
      changeTo: {
        listingTitle: "changeRaPick2Choose1",
        listingName: "MLB 30 Team",
        minbid: "999",
        assignments: "random",
        sellType: "auction",
        breakExtras: {
          extrasType: {
            extrasType: "stashOrPass",
            miniRequired: "999",
          },
        },
      },
    },
    {
      origin: {
        listingTitle: "RaWithExtendedBiding",
        listingName: "NBA 30 Team",
        minbid: "100",
        assignments: "random",
        sellType: "auction",
        breakExtras: {
          extendedBidding: true,
        },
      },
      changeTo: {
        listingTitle: "changeRaWithExtendedBiding",
        listingName: "MLB 30 Team",
        minbid: "999",
        assignments: "random",
        sellType: "auction",
        breakExtras: {
          extendedBidding: false,
        },
      },
    },
  ],
  randomSetPrice: [
    {
      origin: {
        listingTitle: "randomSetPrice",
        listingName: "NBA 30 Team",
        pricePerSpot: "100",
        assignments: "random",
        sellType: "set price",
      },
      changeTo: {
        listingTitle: "changeRandomSetPrice",
        listingName: "MLB 30 Team",
        pricePerSpot: "999",
        assignments: "random",
        sellType: "set price",
      },
    },
  ],
  pickYourSpotSetPrice: [
    {
      origin: {
        listingTitle: "pickYourSpotSetPrice",
        listingName: "NBA 30 Team",
        assignPrices: "100",
        assignments: "pickYourSpot",
        sellType: "set price",
      },
      changeTo: {
        listingTitle: "changePickYourSpotSetPrice",
        listingName: "MLB 30 Team",
        assignPrices: "999",
        assignments: "pickYourSpot",
        sellType: "set price",
      },
    },
  ],
  pickYourSpotAuction: [
    {
      origin: {
        listingTitle: "PYTnoBreakExtras",
        listingName: "NBA 30 Team",
        minbid: "100",
        assignments: "pickYourSpot",
        sellType: "set price",
      },
      changeTo: {
        listingTitle: "changePYTNoBreakExtras",
        listingName: "MLB 30 Team",
        minbid: "100",
        assignments: "pickYourSpot",
        sellType: "set price",
        breakExtras: {
          extendedBidding: true,
        },
      },
    },
    {
      origin: {
        listingTitle: "PYTwithExtendedBiding",
        listingName: "NBA 30 Team",
        minbid: "100",
        assignments: "pickYourSpot",
        sellType: "set price",
        breakExtras: {
          extendedBidding: true,
        },
      },
      changeTo: {
        listingTitle: "changePYTWithExtendedBiding",
        listingName: "MLB 30 Team",
        minbid: "100",
        assignments: "pickYourSpot",
        sellType: "set price",
        breakExtras: {
          extendedBidding: false,
        },
      },
    },
  ],
};

export const listingSample: Listing = {
  listingTitle: "random set",
  listingName: "NBA 30 Team",
  pricePerSpot: "100",
  assignments: "random",
  sellType: "set price",
};

export const products: ProductType[] = [
  { name: "2021", cost: "100" },
  { name: "2022", cost: "100" },
  { name: "2023", cost: "100" },
];

export const RandomAuctionBreakWithNoBreakListing: Listing = {
  listingTitle: "RaNoBreakExtras",
  listingName: "NBA 30 Team",
  minbid: "100",
  assignments: "random",
  sellType: "auction",
  breakExtras: {
    extendedBidding: false,
  },
};

export const RandomAuctionBreakWithStashOrPassListing: Listing = {
  listingTitle: "RaStashOrPass",
  listingName: "NBA 30 Team",
  minbid: "100",
  assignments: "random",
  sellType: "auction",
  breakExtras: {
    extrasType: {
      extrasType: "stashOrPass",
      miniRequired: "100",
    },
  },
};

export const RandomAuctionBreakWithPick2Choose1Listing: Listing = {
  listingTitle: "RaPick2Choose1",
  listingName: "NBA 30 Team",
  minbid: "100",
  assignments: "random",
  sellType: "auction",
  breakExtras: {
    extrasType: {
      extrasType: "pick2Choose1",
      miniRequired: "100",
    },
  },
};

export const RandomAuctionBreakWithExtendedBiddingListing: Listing = {
  listingTitle: "RaWithExtendedBiding",
  listingName: "NBA 30 Team",
  minbid: "100",
  assignments: "random",
  sellType: "auction",
  breakExtras: {
    extendedBidding: true,
  },
};

export const RandomSetPriceListing: Listing = {
  listingTitle: "randomSetPrice",
  listingName: "NBA 30 Team",
  pricePerSpot: "100",
  assignments: "random",
  sellType: "set price",
};

export const PickYourSpotSetPriceListing: Listing = {
  listingTitle: "pickYourSpotSetPrice",
  listingName: "NBA 30 Team",
  assignPrices: "100",
  assignments: "pickYourSpot",
  sellType: "set price",
};

export const PickYourSpotAuctionBreakWithNoBreakListing: Listing = {
  listingTitle: "PYTnoBreakExtras",
  listingName: "NBA 30 Team",
  minbid: "100",
  assignments: "pickYourSpot",
  sellType: "auction",
  breakExtras: {
    extendedBidding: false,
  },
};

export const PickYourSpotAuctionBreakWithExtendedBiddingListing: Listing = {
  listingTitle: "PYTwithExtendedBiding",
  listingName: "NBA 30 Team",
  minbid: "100",
  assignments: "pickYourSpot",
  sellType: "auction",
  breakExtras: {
    extendedBidding: true,
  },
};

export const randommizeListing: Listing = {
  listingTitle: "random set",
  listingName: "NBA 30 Team",
  pricePerSpot: "100",
  assignments: "random",
  sellType: "set price",
};

export const singlesRandomSetPriceListing: Listing = {
  listingTitle: "Singles random set",
  listingName: "NBA 30 Team",
  pricePerSpot: "100",
  assignments: "random",
  sellType: "set price",
  product: { name: "MLB Singles", cost: "100" },
};

export const NBA30TeamSpotsName = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "Los Angeles Clippers",
  "Los Angeles Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Orleans Pelicans",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards",
];
