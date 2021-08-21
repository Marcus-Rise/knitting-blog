import { ContainerModule } from "inversify";
import type { IPrismicService } from "./prismic.service.interface";
import { PRISMIC_SERVICE_PROVIDER } from "./prismic.service.interface";
import { PrismicService } from "./prismic.service";
import type { IPrismicConfigService } from "./prismic-config.service.interface";
import { PRISMIC_CONFIG_SERVICE_PROVIDER } from "./prismic-config.service.interface";
import { PrismicConfigService } from "./prismic-config.service";

const PrismicModule = new ContainerModule((bind) => {
  bind<IPrismicConfigService>(PRISMIC_CONFIG_SERVICE_PROVIDER)
    .to(PrismicConfigService)
    .inSingletonScope();
  bind<IPrismicService>(PRISMIC_SERVICE_PROVIDER).to(PrismicService).inSingletonScope();
});

export { PrismicModule };
