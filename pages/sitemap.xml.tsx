import type { NextPageContext } from "next";
import { inject } from "../src/ioc";
import type { ISeoService } from "../src/seo";
import { SEO_SERVICE_PROVIDER } from "../src/seo";
import { Component } from "react";

class SiteMap extends Component {
  static async getInitialProps({ req, res }: NextPageContext): Promise<void> {
    if (req && res) {
      const service = inject<ISeoService>(SEO_SERVICE_PROVIDER);

      const sitemap = await service.generateSitemap(String(req.headers.host));

      res.writeHead(200, {
        "Content-Type": "application/xml",
      });

      // Display output to user
      res.end(sitemap);
    }
  }
}

export default SiteMap;
