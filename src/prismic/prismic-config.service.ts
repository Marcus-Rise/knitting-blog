import type { IPrismicConfigService } from "./prismic-config.service.interface";
import { injectable } from "inversify";

@injectable()
class PrismicConfigService implements IPrismicConfigService {
  readonly endPoint: string = process.env.PRISMIC_URL ?? "";
  readonly authToken: string = process.env.PRISMIC_AUTH_TOKEN ?? "";
  readonly repoName: string = this.endPoint ? new URL(this.endPoint).hostname.split(".")[0] : "";
}

export { PrismicConfigService };
