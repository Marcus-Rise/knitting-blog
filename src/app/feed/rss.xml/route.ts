import { generateFeed } from "../feed.helper";
import { config } from "../../../config";

const generateRss = async () => {
  const chanel = await generateFeed(config.baseUrl);
  const xml = chanel.rss2();

  const headers = new Headers();

  headers.set("Content-Type", "application/rss+xml; charset=utf-8");

  return new Response(xml, {
    headers,
  });
};

export { generateRss as GET };
