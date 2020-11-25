import type { IAppService, ISiteConfig } from "./app.service.interface";
import { injectable } from "inversify";

@injectable()
class AppService implements IAppService {
  siteConfig: ISiteConfig;

  constructor() {
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
