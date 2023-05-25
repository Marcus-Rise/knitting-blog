import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default (): MetadataRoute.Robots => {
  const isAllow = Boolean(process.env.ALLOW_ROBOTS);
  const host = headers().get("Host") ?? "";

  return {
    rules: isAllow
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          disallow: "/",
        },
    sitemap: `https://${host}/sitemap.xml`,
  };
};
