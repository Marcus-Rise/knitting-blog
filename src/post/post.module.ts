import { ContainerModule } from "inversify";
import type { IPostService } from "./post.service.interface";
import { POST_SERVICE_PROVIDER } from "./post.service.interface";
import type { IPostRepository } from "./post.repository.interface";
import { POST_REPOSITORY_PROVIDER } from "./post.repository.interface";
import { PostInMemoryRepository } from "./post.in-memory.repository";
import { PostService } from "./post.service";

const PostModule = new ContainerModule((bind) => {
  bind<IPostRepository>(POST_REPOSITORY_PROVIDER).to(PostInMemoryRepository).inSingletonScope();
  bind<IPostService>(POST_SERVICE_PROVIDER).to(PostService).inSingletonScope();
});

export { PostModule };
