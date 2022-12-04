import type { NextApiHandler } from "next";
import { inject } from "../../server";
import type { ISeoService } from "../../server/seo/service";
import { SEO_SERVICE } from "../../server/seo/service";

const getSitemap = (hostName: string) =>
  inject((seoService: ISeoService) => seoService.generateSitemapXml(hostName), [SEO_SERVICE]);

const Sitemap: NextApiHandler = async (req, res) => {
  const hostName = `https://${req.headers.host}`;

  if (!hostName) {
    throw new Error("no hostname provided");
  }

  const sitemap = await getSitemap(hostName);

  return res.send(sitemap);
};

export default Sitemap;
