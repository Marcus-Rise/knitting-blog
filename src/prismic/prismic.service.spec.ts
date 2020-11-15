import "reflect-metadata";
import { PrismicService } from "./prismic.service";
import { mock } from "jest-mock-extended";
import type { IAppService } from "../app";

describe("PrismicService", () => {
  test("client", () => {
    const prismicUrl = "prismicUrl1";
    const { client } = new PrismicService(
      mock<IAppService>({
        prismicUrl,
      }),
    );

    expect(client.api.url).toEqual(prismicUrl);
  });
});
