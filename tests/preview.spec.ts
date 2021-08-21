import handler from "../pages/api/preview";
import { mock } from "jest-mock-extended";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IPrismicService } from "../src/prismic";

describe("preview", () => {
  test("Invalid dto", async () => {
    let res: unknown = "";

    await handler(
      mock<NextApiRequest>(),
      mock<NextApiResponse>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status() {
          return {
            json: (body: unknown) => {
              res = body;
            },
          };
        },
        end: (response: unknown) => (res = String(response)),
      }),
      mock<IPrismicService>(),
    );

    expect(res).toEqual({ message: "Invalid dto" });
  });
  test("Invalid token", async () => {
    let res: unknown = "";

    await handler(
      mock<NextApiRequest>({
        query: { token: "token", documentId: "documentId" },
      }),
      mock<NextApiResponse>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status() {
          return {
            json: (body: unknown) => {
              res = body;
            },
          };
        },
        end: (response: unknown) => (res = String(response)),
      }),
      mock<IPrismicService>({
        client: {
          getPreviewResolver: () => ({
            token: "",
            resolve: () => Promise.resolve(""),
          }),
        },
      }),
    );

    expect(res).toEqual({ message: "Invalid token" });
  });
  test("ok", async () => {
    let res = "";

    await handler(
      mock<NextApiRequest>({
        query: { token: "token", documentId: "documentId" },
      }),
      mock<NextApiResponse>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        write(body) {
          res = body;
        },
      }),
      mock<IPrismicService>({
        client: {
          getPreviewResolver: () => ({
            token: "",
            resolve: () => Promise.resolve("/"),
          }),
        },
      }),
    );

    expect(res.length).toBeGreaterThan(0);
  });
});
