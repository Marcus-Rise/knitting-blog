import type { IPrismicService } from "./prismic.service.interface";
import type { DefaultClient } from "prismic-javascript/types/client";
import Prismic from "prismic-javascript";
import { inject, injectable } from "inversify";
import type { IPrismicConfigService } from "../config";
import { PRISMIC_CONFIG_SERVICE_PROVIDER } from "../config";

@injectable()
class PrismicService implements IPrismicService {
  client: DefaultClient;

  constructor(
    @inject(PRISMIC_CONFIG_SERVICE_PROVIDER)
    private readonly config: IPrismicConfigService,
  ) {
    this.client = Prismic.client(this.config.endPoint, { accessToken: this.config.authToken });
  }
}

export { PrismicService };
