import type { IAppService, ISiteConfig } from "./app.service.interface";
import { injectable } from "inversify";

@injectable()
class AppService implements IAppService {
  prismicUrl: string;
  siteConfig: ISiteConfig;

  constructor() {
    this.prismicUrl = process.env.PRISMIC_URL || "";

    this.siteConfig = {
      title: "Надя вяжет",
      author: {
        name: "Ilya Konstantinov",
        url: "https://marcus-rise.dev",
      },
    };
  }
}

export { AppService };
