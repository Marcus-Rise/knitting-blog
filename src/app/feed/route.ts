import type { NextRequest } from "next/server";
import { generateFeed } from "./feed.helper";

const generateFeedJson = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const host = requestHeaders.get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);
  const feedUrl = new URL(req.url).pathname;

  const chanel = await generateFeed(baseUrl, feedUrl);
  const json = chanel.json1();

  const headers = new Headers();

  headers.set("Content-Type", "application/feed+json; charset=utf-8");

  return new Response(json, {
    headers,
  });
};

export { generateFeedJson as GET };
