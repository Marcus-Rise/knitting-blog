import type { IPrismicConfigService } from "./prismic-config.service.interface";
import { injectable } from "inversify";

@injectable()
class PrismicConfigService implements IPrismicConfigService {
  readonly endPoint: string = process.env.PRISMIC_URL ?? "";
}

export { PrismicConfigService };
