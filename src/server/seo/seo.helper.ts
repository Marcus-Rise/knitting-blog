import { inject } from "../ioc";
import type { ISeoService } from "./service";
import { SEO_SERVICE } from "./service";

const getRobotsTxt = (hostName: string, isAllow: boolean): string => {
  const robots: Record<string, string> = isAllow
    ? {
        "User-agent": "*",
        Allow: "/",
        Sitemap: `https://${hostName}/sitemap.xml`,
      }
    : {
        "User-agent": "*",
        Disallow: "/",
        Sitemap: `https://${hostName}/sitemap.xml`,
      };

  return Object.keys(robots)
    .map((i) => `${i}: ${robots[i]}`)
    .join("\n");
};

const getSitemap = (hostName: string) =>
  inject((seoService: ISeoService) => seoService.generateSitemapXml(hostName), [SEO_SERVICE]);

export { getRobotsTxt, getSitemap };
