import type { NextRequest } from "next/server";
import { generateFeed } from "./feed.helper";
import { config } from "../../config";

const generateFeedJson = async (req: NextRequest) => {
  const chanel = await generateFeed(config.baseUrl);
  const json = chanel.json1();

  const headers = new Headers();

  headers.set("Content-Type", "application/feed+json; charset=utf-8");

  return new Response(json, {
    headers,
  });
};

export { generateFeedJson as GET };
