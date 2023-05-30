import type { MetadataRoute } from "next";
import { headers } from "next/headers";

type Rules = MetadataRoute.Robots["rules"];

const allowRules: Rules = {
  userAgent: "*",
  allow: "/",
};
const disallowRules: Rules = {
  userAgent: "*",
  disallow: "/",
};

const robots = (): MetadataRoute.Robots => {
  const isAllow = Boolean(process.env.ALLOW_ROBOTS);
  const host = headers().get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);

  const sitemap = new URL(`/sitemap.xml`, baseUrl).href;

  return {
    rules: isAllow ? allowRules : disallowRules,
    sitemap,
  };
};

export default robots;
