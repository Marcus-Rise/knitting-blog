import type { IAppService } from "./app.service.interface";
import { injectable } from "inversify";

@injectable()
class AppService implements IAppService {
  readonly title = "Надя вяжет";
  readonly author = {
    name: "Ilya Konstantinov",
    url: "https://marcus-rise.dev",
  };
}

export { AppService };
