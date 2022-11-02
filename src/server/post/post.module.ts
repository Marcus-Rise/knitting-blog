import { ContainerModule } from "inversify";
import type { IPostConfig } from "./config";
import { POST_CONFIG } from "./config";
import type { IPostRepository } from "./repository";
import { POST_REPOSITORY } from "./repository";
import { PostRepository } from "./repository/post.repository";
import type { IPostService } from "./service";
import { POST_SERVICE } from "./service";
import { PostConfig } from "./config/post.config";
import { PostService } from "./service/post.service";

const PostModule = new ContainerModule((bind) => {
  bind<IPostConfig>(POST_CONFIG).to(PostConfig);
  bind<IPostRepository>(POST_REPOSITORY).to(PostRepository);
  bind<IPostService>(POST_SERVICE).to(PostService);
});

export { PostModule };
