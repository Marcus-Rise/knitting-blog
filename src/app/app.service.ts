import type { IAppService } from "./app.service.interface";
import { injectable } from "inversify";

@injectable()
class AppService implements IAppService {
  prismicUrl: string;

  constructor() {
    try {
      this.prismicUrl = process.env.PRISMIC_URL || "";
    } catch {
      this.prismicUrl = "";
    }
  }
}

export { AppService };
