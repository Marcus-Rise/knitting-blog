import type { IPostService } from "./post.service.interface";
import type { IPost } from "../post.interface";
import { inject, injectable } from "inversify";
import type { IPostRepository } from "../repository";
import { POST_REPOSITORY_PROVIDER } from "../repository";

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

  async getById(id: string): Promise<IPost | null> {
    return this.repo.find({ id });
  }

  async getPreview(ref: string): Promise<IPost | null> {
    return this.repo.find({ previewRef: ref });
  }

  async getForMainPage(): Promise<IPost[]> {
    return this.getList(0, 5);
  }
}

export { PostService };