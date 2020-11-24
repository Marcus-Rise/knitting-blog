import "reflect-metadata";
import type { NextApiHandler } from "next";
import { inject } from "../../src/ioc";
import type { ISeoService } from "../../src/seo";
import { SEO_SERVICE_PROVIDER } from "../../src/seo";

const handler: NextApiHandler = async (req, res) => {
  const service = inject<ISeoService>(SEO_SERVICE_PROVIDER);

  const robotsTxt = await service.generateRobotsTxt(String(req.headers.host));

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end(robotsTxt);
};

export default handler;
