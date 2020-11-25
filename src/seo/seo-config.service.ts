import type { ISeoConfigService } from "./seo-config.service.interface";
import { injectable } from "inversify";

@injectable()
class SeoConfigService implements ISeoConfigService {
  readonly allowRobots: boolean = Boolean(process.env.ALLOW_ROBOTS);
}

export { SeoConfigService };
