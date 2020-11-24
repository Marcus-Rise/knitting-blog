import type { NextPageContext } from "next";
import { inject } from "../src/ioc";
import type { ISeoService } from "../src/seo";
import { SEO_SERVICE_PROVIDER } from "../src/seo";
import { Component } from "react";

class RobotsTxt extends Component {
  static async getInitialProps({ req, res }: NextPageContext): Promise<void> {
    if (req && res) {
      const service = inject<ISeoService>(SEO_SERVICE_PROVIDER);

      const robotsTxt = await service.generateRobotsTxt(String(req.headers.host));

      res.writeHead(200, {
        "Content-Type": "text/plain",
      });

      // Display output to user
      res.end(robotsTxt);
    }
  }
}

export default RobotsTxt;
