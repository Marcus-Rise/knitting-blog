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
});
