import { DateToString, DateToStringSeo } from "./date-to-string.function";

describe("DateToString", () => {
  test("2020-11-14T17:47:51+0000 is Ноябрь 14, 2020", () => {
    expect(DateToString("2020-11-14T17:47:51+0000")).toEqual("ноябрь 14, 2020");
  });
  test("empty is Не опубликовано", () => {
    expect(DateToString("")).toEqual("Не опубликовано");
  });
});

describe("DateToStringSeo", () => {
  it("should parse date string to yyyy-mm-dd", () => {
    expect(DateToStringSeo(new Date("2020-08-12").toJSON())).toEqual("2020-08-12");
  });
});
