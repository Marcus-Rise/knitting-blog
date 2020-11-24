import type { ISeoService } from "./seo.service.interface";
import { injectable } from "inversify";

@injectable()
class SeoServiceMock implements ISeoService {
  generateRobotsTxt(): Promise<string> {
    return Promise.resolve("");
  }

  generateSitemap(): Promise<string> {
    return Promise.resolve("");
  }
}

export { SeoServiceMock };
