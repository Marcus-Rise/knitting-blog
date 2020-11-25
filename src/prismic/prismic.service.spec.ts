import "reflect-metadata";
import { PrismicService } from "./prismic.service";
import { mock } from "jest-mock-extended";
import type { IPrismicConfigService } from "./prismic-config.service.interface";

describe("PrismicService", () => {
  test("client", () => {
    const prismicUrl = "prismicUrl1";
    const { client } = new PrismicService(
      mock<IPrismicConfigService>({
        endPoint: prismicUrl,
      }),
    );

    expect(client.api.url).toEqual(prismicUrl);
  });
});
