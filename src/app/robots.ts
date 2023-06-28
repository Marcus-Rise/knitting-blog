import type { MetadataRoute } from "next";
import { config } from "../config";

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
  const isAllow = process.env.ALLOW_ROBOTS === "true";

  const sitemap = new URL(`/sitemap.xml`, config.baseUrl).href;

  return {
    rules: isAllow ? allowRules : disallowRules,
    sitemap,
  };
};

export default robots;
