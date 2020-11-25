import "reflect-metadata";
import { AppService } from "./app.service";

describe("AppService", () => {
  test("title", () => {
    const { title } = new AppService();

    expect(title).toEqual("Надя вяжет");
  });
  test("author", () => {
    const { author } = new AppService();

    expect(author.name).toEqual("Ilya Konstantinov");
    expect(author.url).toEqual("https://marcus-rise.dev");
  });
});
