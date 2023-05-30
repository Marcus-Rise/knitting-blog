import type { IPostService } from "./post-service.interface";
import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";
import { inject, injectable } from "inversify";
import type { IPostRepository } from "../repository";
import { POST_REPOSITORY } from "../repository";

const POST_TOTAL_COUNT = 100;

@injectable()
class PostService implements IPostService {
  constructor(@inject(POST_REPOSITORY) private readonly _repo: IPostRepository) {}

  async getAll(limit = POST_TOTAL_COUNT, offsetPage?: number): Promise<PostPreviewModel[]> {
    return this._repo.list({ limit, offsetPage });
  }

  async getSlugByID(id: string): Promise<string | null> {
    const post = await this._repo.find({ id }).catch((e) => {
      console.error(e);

      return null;
    });

    if (!post) {
      return null;
    }

    return post.slug;
  }

  async getByUUID(uuid: string): Promise<PostWithContentModel | null> {
    const escapedUUID = decodeURIComponent(uuid);
    const post = await this._repo.find({ uuid: escapedUUID });

    if (!post) {
      return null;
    }

    return post;
  }

  async getPreview(previewRef: string, documentId: string): Promise<PostWithContentModel | null> {
    return this._repo.find({ previewRef, id: documentId });
  }
}

export { PostService };
