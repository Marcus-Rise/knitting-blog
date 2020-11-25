import "reflect-metadata";
import { PrismicConfigService } from "./prismic-config.service";

describe("PrismicConfigService", () => {
  describe("endPoint", () => {
    test("undefined is empty string", () => {
      const { endPoint } = new PrismicConfigService();

      expect(endPoint).toEqual("");
    });

    test("defined", () => {
      const url = "https://test.cdn.prismic.io/api/v2";
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

  describe("repoName", () => {
    test("empty endpoint is empty repo name", () => {
      const { endPoint, repoName } = new PrismicConfigService();

      expect(endPoint).toEqual("");
      expect(repoName).toEqual("");
    });
    test("defined endpoint is not empty repo name", () => {
      const url = "https://test.cdn.prismic.io/api/v2";
      process.env.PRISMIC_URL = url;
      const { endPoint, repoName } = new PrismicConfigService();

      expect(endPoint).toEqual(url);
      expect(repoName).toEqual("test");
    });
  });
});
