import type { IPostConfig } from "./post-config.interface";
import { injectable } from "inversify";

@injectable()
class PostConfig implements IPostConfig {
  readonly apiUrl: string;
  readonly apiToken: string;
  readonly masterRef: string;

  constructor() {
    this.apiUrl = process.env.PRISMIC_API_URL ?? "";
    this.apiToken = process.env.PRISMIC_AUTH_TOKEN ?? "";
    this.masterRef = process.env.PRISMIC_MASTER_REF ?? "";
  }
}

export { PostConfig };
