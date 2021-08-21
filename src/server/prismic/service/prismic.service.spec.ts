import "reflect-metadata";
import { PrismicService } from "./prismic.service";
import { mock } from "jest-mock-extended";
import type { IPrismicConfigService } from "../config/prismic-config.service.interface";

describe("PrismicService", () => {
  test("client", () => {
    const url = "prismicUrl1";
    const token = "token";
    const { client } = new PrismicService(
      mock<IPrismicConfigService>({
        endPoint: url,
        authToken: token,
      }),
    );

    expect(client.api.url).toEqual(`${url}?access_token=${token}`);
  });
});
