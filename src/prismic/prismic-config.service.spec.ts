import "reflect-metadata";
import { PrismicConfigService } from "./prismic-config.service";

describe("PrismicConfigService", () => {
  describe("endPoint", () => {
    test("undefined is empty string", () => {
      const { endPoint } = new PrismicConfigService();

      expect(endPoint).toEqual("");
    });

    test("defined", () => {
      const url = "URL_TEST";
      process.env.PRISMIC_URL = url;
      const { endPoint } = new PrismicConfigService();

      expect(endPoint).toEqual(url);
    });
  });
});
