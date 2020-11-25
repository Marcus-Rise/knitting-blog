import "reflect-metadata";
import { SeoConfigService } from "./seo-config.service";

describe("SeoConfigService", () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

  describe("allow robots", () => {
    test("empty is false", () => {
      const { allowRobots } = new SeoConfigService();

      expect(allowRobots).toBeFalsy();
    });
    test("true string is true", () => {
      process.env.ALLOW_ROBOTS = "true";
      const { allowRobots } = new SeoConfigService();

      expect(allowRobots).toBeTruthy();
    });
  });

  describe("googleVerificationCode", () => {
    test("empty", () => {
      const { googleVerificationCode } = new SeoConfigService();

      expect(googleVerificationCode).toEqual("");
    });
    test("is not empty", () => {
      const env = "true";
      process.env.GOOGLE_VERIFICATION = env;
      const { googleVerificationCode } = new SeoConfigService();

      expect(googleVerificationCode).toEqual(env);
    });
  });

  describe("yandexVerificationCode", () => {
    test("empty", () => {
      const { yandexVerificationCode } = new SeoConfigService();

      expect(yandexVerificationCode).toEqual("");
    });
    test("is not empty", () => {
      const env = "true";
      process.env.YANDEX_VERIFICATION = env;
      const { yandexVerificationCode } = new SeoConfigService();

      expect(yandexVerificationCode).toEqual(env);
    });
  });
});
