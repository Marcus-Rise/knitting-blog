import "reflect-metadata";
import { AppService } from "./app.service";

describe("AppService", () => {
  test("prismicUrl", () => {
    const { prismicUrl } = new AppService();

    expect(prismicUrl).toEqual("");
  });
  describe("allow robots", () => {
    test("empty is false", () => {
      const { allowRobots } = new AppService();

      expect(allowRobots).toBeFalsy();
    });
    test("true string is true", () => {
      process.env.ALLOW_ROBOTS = "true";
      const { allowRobots } = new AppService();

      expect(allowRobots).toBeTruthy();
    });
  });
});
