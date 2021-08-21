import { ContainerModule } from "inversify";
import type { IPostService } from "./service";
import { POST_SERVICE_PROVIDER, PostService } from "./service";
import type { IPostRepository } from "./post.repository.interface";
import { POST_REPOSITORY_PROVIDER } from "./post.repository.interface";
import { PostPrismicRepository } from "./post-prismic.repository";

const PostModule = new ContainerModule((bind) => {
  bind<IPostRepository>(POST_REPOSITORY_PROVIDER).to(PostPrismicRepository).inSingletonScope();
  bind<IPostService>(POST_SERVICE_PROVIDER).to(PostService).inSingletonScope();
});

export { PostModule };
