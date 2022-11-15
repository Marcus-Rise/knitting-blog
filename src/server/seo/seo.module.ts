import { ContainerModule } from "inversify";
import type { ISeoService } from "./service";
import { SEO_SERVICE } from "./service";
import { SeoService } from "./service/seo.service";

const SeoModule = new ContainerModule((bind) => {
  bind<ISeoService>(SEO_SERVICE).to(SeoService);
});

export { SeoModule };
