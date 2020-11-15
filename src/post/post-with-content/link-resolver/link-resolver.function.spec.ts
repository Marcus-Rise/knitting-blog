import { LinkResolver } from "./link-resolver.function";
import { mock } from "jest-mock-extended";
import type { Document } from "prismic-javascript/types/documents";

describe("LinkResolver", () => {
  test("post", () => {
    expect(
      LinkResolver(
        mock<Document>({ type: "post" }),
      ),
    ).toEqual("/[slug]");
  });

  test("another", () => {
    expect(
      LinkResolver(
        mock<Document>({ type: "111" }),
      ),
    ).toEqual("/");
  });
});
