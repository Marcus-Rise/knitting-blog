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
  const robotsTxt = await service.generateRobotsTxt(String(req.headers.host));

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end(robotsTxt);
};

export default handler;
