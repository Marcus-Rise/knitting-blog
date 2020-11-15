import { ContainerModule } from "inversify";
import type { IAppService } from "./app.service.interface";
import { APP_SERVICE_PROVIDER } from "./app.service.interface";
import { AppService } from "./app.service";

const AppModule = new ContainerModule((bind) => {
  bind<IAppService>(APP_SERVICE_PROVIDER).to(AppService).inSingletonScope();
});

export { AppModule };
