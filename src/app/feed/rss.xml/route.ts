import type { NextRequest } from "next/server";
import { generateFeed } from "../feed.helper";

const generateRss = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const host = requestHeaders.get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);
  const feedUrl = new URL(req.url).pathname;

  const chanel = await generateFeed(baseUrl, feedUrl);
  const xml = chanel.rss2();

  const headers = new Headers();

  headers.set("Content-Type", "application/rss+xml; charset=utf-8");

  return new Response(xml, {
    headers,
  });
};

export { generateRss as GET };
