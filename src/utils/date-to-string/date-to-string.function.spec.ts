import { DateToString } from "./date-to-string.function";

describe("DateToString", () => {
  test("2020-11-14T17:47:51+0000 is Ноябрь 14, 2020", () => {
    expect(DateToString("2020-11-14T17:47:51+0000")).toEqual("ноябрь 14, 2020");
  });
});
