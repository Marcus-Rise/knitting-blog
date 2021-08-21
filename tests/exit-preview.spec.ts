import handler from "../pages/api/exit-preview";
import { mock } from "jest-mock-extended";
import type { NextApiRequest, NextApiResponse } from "next";

describe("exit-preview", () => {
  test("host", () => {
    let res: unknown[] = [];

    handler(
      mock<NextApiRequest>(),
      mock<NextApiResponse>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        writeHead: (...args) => (res = args),
      }),
    );

    const [code, body] = res;
    expect(code).toBe(307);
    expect(body).toEqual({ Location: "/" });
  });
});
