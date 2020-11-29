import "reflect-metadata";
import type { NextApiRequest, NextApiResponse } from "next";
import { inject } from "../../src/ioc";
import type { ISeoService } from "../../src/seo";
import { SEO_SERVICE_PROVIDER } from "../../src/seo";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  service = inject<ISeoService>(SEO_SERVICE_PROVIDER),
): Promise<void> => {
  const sitemap = await service.generateSitemap(String(req.headers.host));

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  res.end(sitemap);
};

export default handler;
