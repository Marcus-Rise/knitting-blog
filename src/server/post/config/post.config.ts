import type { IPostConfig } from "./post-config.interface";
import { injectable } from "inversify";

@injectable()
class PostConfig implements IPostConfig {
  readonly apiUrl: string;

  constructor() {
    this.apiUrl = process.env.API_URL ?? "";
  }
}

export { PostConfig };
