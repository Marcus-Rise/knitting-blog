import type { IPrismicService } from "./prismic.service.interface";
import type { DefaultClient } from "prismic-javascript/types/client";
import Prismic from "prismic-javascript";
import { inject, injectable } from "inversify";
import type { IAppService } from "../app";
import { APP_SERVICE_PROVIDER } from "../app";

@injectable()
class PrismicService implements IPrismicService {
  client: DefaultClient;

  constructor(
    @inject(APP_SERVICE_PROVIDER)
    private readonly app: IAppService,
  ) {
    this.client = Prismic.client(this.app.prismicUrl);
  }
}

export { PrismicService };
