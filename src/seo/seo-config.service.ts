import type { ISeoConfigService } from "./seo-config.service.interface";
import { injectable } from "inversify";

@injectable()
class SeoConfigService implements ISeoConfigService {
  readonly allowRobots: boolean = Boolean(process.env.ALLOW_ROBOTS);
  readonly googleVerificationCode: string = process.env.GOOGLE_VERIFICATION ?? "";
  readonly yandexVerificationCode: string = process.env.YANDEX_VERIFICATION ?? "";
}

export { SeoConfigService };
