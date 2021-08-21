import { ContainerModule } from "inversify";
import type { ISeoService } from "./seo.service.interface";
import { SEO_SERVICE_PROVIDER } from "./seo.service.interface";
import { SeoService } from "./seo.service";
import type { ISeoConfigService } from "./config";
import { SEO_CONFIG_SERVICE_PROVIDER, SeoConfigService } from "./config";

const SeoModule = new ContainerModule((bind) => {
  bind<ISeoConfigService>(SEO_CONFIG_SERVICE_PROVIDER).to(SeoConfigService).inSingletonScope();
  bind<ISeoService>(SEO_SERVICE_PROVIDER).to(SeoService).inSingletonScope();
});

export { SeoModule };
