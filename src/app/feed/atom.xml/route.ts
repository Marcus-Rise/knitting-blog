import { generateFeed } from "../feed.helper";
import { config } from "../../../config";

const generateAtom = async () => {
  const chanel = await generateFeed(config.baseUrl);
  const xml = chanel.atom1();

  const headers = new Headers();

  headers.set("Content-Type", "application/atom+xml; charset=utf-8");

  return new Response(xml, {
    headers,
  });
};

export { generateAtom as GET };
