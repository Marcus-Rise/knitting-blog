import { ContainerModule } from "inversify";
import type { ISeoService } from "./seo.service.interface";
import { SEO_SERVICE_PROVIDER } from "./seo.service.interface";
import { SeoServiceMock } from "./seo.service.mock";

const SeoModule = new ContainerModule((bind) => {
  bind<ISeoService>(SEO_SERVICE_PROVIDER).to(SeoServiceMock).inSingletonScope();
});

export { SeoModule };
