import "reflect-metadata";
import { PrismicConfigService } from "./prismic-config.service";

describe("PrismicConfigService", () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

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
  describe("authToken", () => {
    test("undefined is empty string", () => {
      const { authToken } = new PrismicConfigService();

      expect(authToken).toEqual("");
    });

    test("defined", () => {
      const token = "TOKEN";
      process.env.PRISMIC_AUTH_TOKEN = token;
      const { authToken } = new PrismicConfigService();

      expect(authToken).toEqual(token);
    });
  });
});
