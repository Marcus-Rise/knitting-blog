import type { NextRequest } from "next/server";
import { generateFeed } from "../feed.helper";

const generateAtom = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const host = requestHeaders.get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);

  const chanel = await generateFeed(baseUrl);
  const xml = chanel.atom1();

  const headers = new Headers();

  headers.set("Content-Type", "application/atom+xml; charset=utf-8");

  return new Response(xml, {
    headers,
  });
};

export { generateAtom as GET };
