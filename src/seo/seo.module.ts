import { ContainerModule } from "inversify";
import type { ISeoService } from "./seo.service.interface";
import { SEO_SERVICE_PROVIDER } from "./seo.service.interface";
import { SeoService } from "./seo.service";
import type { ISeoConfigService } from "./seo-config.service.interface";
import { SEO_CONFIG_SERVICE } from "./seo-config.service.interface";
import { SeoConfigService } from "./seo-config.service";

const SeoModule = new ContainerModule((bind) => {
  bind<ISeoConfigService>(SEO_CONFIG_SERVICE).to(SeoConfigService).inSingletonScope();
  bind<ISeoService>(SEO_SERVICE_PROVIDER).to(SeoService).inSingletonScope();
});

export { SeoModule };
