import type { IPostConfig } from "./post-config.interface";
import { injectable } from "inversify";

@injectable()
class PostConfig implements IPostConfig {
  readonly apiUrl: string;
  readonly apiToken: string;
  readonly masterRef: string;

  constructor() {
    this.apiUrl = `https://${process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY ?? ""}.cdn.prismic.io`;
    this.apiToken = process.env.PRISMIC_AUTH_TOKEN ?? "";
    this.masterRef = process.env.PRISMIC_MASTER_REF ?? "";
  }
}

export { PostConfig };
