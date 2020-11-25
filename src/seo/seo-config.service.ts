import type { ISeoConfigService } from "./seo-config.service.interface";
import { injectable } from "inversify";

@injectable()
class SeoConfigService implements ISeoConfigService {
  readonly allowRobots: boolean = Boolean(process.env.ALLOW_ROBOTS);
  readonly googleVerificationCode: string = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "";
  readonly yandexVerificationCode: string = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "";
}

export { SeoConfigService };
