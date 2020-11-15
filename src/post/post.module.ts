import { ContainerModule } from "inversify";
import type { IPostService } from "./post.service.interface";
import { POST_SERVICE_PROVIDER } from "./post.service.interface";
import type { IPostRepository } from "./post.repository.interface";
import { POST_REPOSITORY_PROVIDER } from "./post.repository.interface";
import { PostService } from "./post.service";
import { PostPrismicRepository } from "./post-prismic.repository";

const PostModule = new ContainerModule((bind) => {
  bind<IPostRepository>(POST_REPOSITORY_PROVIDER).to(PostPrismicRepository).inSingletonScope();
  bind<IPostService>(POST_SERVICE_PROVIDER).to(PostService).inSingletonScope();
});

export { PostModule };
