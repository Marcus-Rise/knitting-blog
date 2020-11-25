import "reflect-metadata";
import { AppService } from "./app.service";

describe("AppService", () => {
  test("siteConfig", () => {
    const { siteConfig } = new AppService();

    expect(siteConfig.title).toEqual("Надя вяжет");
    expect(siteConfig.author.name).toEqual("Ilya Konstantinov");
    expect(siteConfig.author.url).toEqual("https://marcus-rise.dev");
  });
});
