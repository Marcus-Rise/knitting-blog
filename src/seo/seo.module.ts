import { ContainerModule } from "inversify";
import type { ISeoService } from "./seo.service.interface";
import { SEO_SERVICE_PROVIDER } from "./seo.service.interface";
import { SeoService } from "./seo.service";

const SeoModule = new ContainerModule((bind) => {
  bind<ISeoService>(SEO_SERVICE_PROVIDER).to(SeoService).inSingletonScope();
});

export { SeoModule };
