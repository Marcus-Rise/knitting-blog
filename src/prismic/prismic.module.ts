import { ContainerModule } from "inversify";
import type { IPrismicService } from "./prismic.service.interface";
import { PRISMIC_SERVICE_PROVIDER } from "./prismic.service.interface";
import { PrismicService } from "./prismic.service";

const PrismicModule = new ContainerModule((bind) => {
  bind<IPrismicService>(PRISMIC_SERVICE_PROVIDER).to(PrismicService).inSingletonScope();
});

export { PrismicModule };
