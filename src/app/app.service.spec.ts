import "reflect-metadata";
import { AppService } from "./app.service";

describe("AppService", () => {
  test("prismicUrl", () => {
    const { prismicUrl } = new AppService();

    expect(prismicUrl).toEqual("");
  });
});
