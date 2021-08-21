import { ContainerModule } from "inversify";
import type { IPrismicService } from "./service";
import { PRISMIC_SERVICE_PROVIDER, PrismicService } from "./service";
import type { IPrismicConfigService } from "./config";
import { PRISMIC_CONFIG_SERVICE_PROVIDER, PrismicConfigService } from "./config";

const PrismicModule = new ContainerModule((bind) => {
  bind<IPrismicConfigService>(PRISMIC_CONFIG_SERVICE_PROVIDER)
    .to(PrismicConfigService)
    .inSingletonScope();
  bind<IPrismicService>(PRISMIC_SERVICE_PROVIDER).to(PrismicService).inSingletonScope();
});

export { PrismicModule };
