import { APIRequestContext, request } from "@playwright/test";

export interface Config {
  headers: {
    "Content-Type": "application/json; charset=utf-8";
    Accept: "application/json";
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3730.400 QQBrowser/10.5.3805.400";
    Authorization?: string;
  };
  data?: Query;
}

export interface Query {
  operationName?: string;
  query: string;
  variables?: any;
}

export class Api {
  baseUrl: string;
  request: Promise<APIRequestContext>;
  basicConfig: Config;
  getConfig;
  constructor() {
    this.baseUrl = "https://os.dev.fanatics.live/graphql";
    this.request = request.newContext();
    this.basicConfig = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3730.400 QQBrowser/10.5.3805.400",
      },
    };

    this.getConfig = (auth?: string, data?: Query): Config => {
      if (auth) {
        return {
          headers: {
            ...this.basicConfig.headers,
            Authorization: auth,
          },
          data: data,
        };
      } else {
        return {
          headers: {
            ...this.basicConfig.headers,
          },
          data: data,
        };
      }
    };
  }

  public get = async (auth?: string, data?: Query) => {
    const res = (
      await (await this.request).get(this.baseUrl, this.getConfig(auth, data))
    ).json();

    return await res
      .then((data) => {
        return data.data;
      })
      .catch();
  };

  public post = async (auth?: string, data?: Query) => {
    const res = (
      await (await this.request).post(this.baseUrl, this.getConfig(auth, data))
    ).json();
    return await res
      .then((data) => {
        return data.data;
      })
      .catch();
  };
}
