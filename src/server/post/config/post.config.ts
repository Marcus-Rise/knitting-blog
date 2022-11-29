import type { IPostConfig } from "./post-config.interface";
import { injectable } from "inversify";

@injectable()
class PostConfig implements IPostConfig {
  readonly apiUrl: string;
  readonly apiToken: string;

  constructor() {
    this.apiUrl = process.env.API_URL ?? "";
    this.apiToken = process.env.PRISMIC_AUTH_TOKEN ?? "";
  }
}

export { PostConfig };
