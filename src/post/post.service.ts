import type { IPostService } from "./post.service.interface";
import type { IPost } from "./post.interface";
import { inject, injectable } from "inversify";
import type { IPostRepository } from "./post.repository.interface";
import { POST_REPOSITORY_PROVIDER } from "./post.repository.interface";

@injectable()
class PostService implements IPostService {
  constructor(
    @inject(POST_REPOSITORY_PROVIDER)
    private readonly repo: IPostRepository,
  ) {}

  async getBySlug(slug: string): Promise<IPost | null> {
    return this.repo.find({ slug });
  }

  async getList(offset: number, limit?: number): Promise<IPost[]> {
    return this.repo.list({}, offset, limit);
  }
}

export { PostService };
