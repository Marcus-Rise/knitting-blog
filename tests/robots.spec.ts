import handler from "../pages/api/robots";
import { mock } from "jest-mock-extended";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ISeoService } from "../src/seo";

describe("robots", () => {
  test("host", async () => {
    let res = "";

    await handler(
      mock<NextApiRequest>({
        headers: { host: "host.com" },
      }),
      mock<NextApiResponse>({
        end: (response: unknown) => (res = String(response)),
      }),
      mock<ISeoService>({
        generateRobotsTxt: (hostName) => Promise.resolve(hostName),
      }),
    );

    expect(res).toEqual("host.com");
  });
});
