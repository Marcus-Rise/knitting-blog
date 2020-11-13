import { ContainerModule } from "inversify";
import type { IPostService } from "./post.service.interface";
import { POST_SERVICE_PROVIDER } from "./post.service.interface";
import { PostServiceMock } from "./post.service.mock";

const PostModule = new ContainerModule((bind) => {
  bind<IPostService>(POST_SERVICE_PROVIDER).to(PostServiceMock).inSingletonScope();
});

export { PostModule };
