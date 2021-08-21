import { ContainerModule } from "inversify";
import type { ISeoService } from "./service";
import { SEO_SERVICE_PROVIDER, SeoService } from "./service";
import type { ISeoConfigService } from "./config";
import { SEO_CONFIG_SERVICE_PROVIDER, SeoConfigService } from "./config";

const SeoModule = new ContainerModule((bind) => {
  bind<ISeoConfigService>(SEO_CONFIG_SERVICE_PROVIDER).to(SeoConfigService).inSingletonScope();
  bind<ISeoService>(SEO_SERVICE_PROVIDER).to(SeoService).inSingletonScope();
});

export { SeoModule };
