import "reflect-metadata";
import { AppService } from "./app.service";

describe("AppService", () => {
  test("siteConfig", () => {
    const { author, title } = new AppService();

    expect(title).toEqual("Надя вяжет");
    expect(author.name).toEqual("Ilya Konstantinov");
    expect(author.url).toEqual("https://marcus-rise.dev");
  });
});
