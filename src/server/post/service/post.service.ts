import type { IPostService } from "./post-service.interface";
import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";
import { inject, injectable } from "inversify";
import type { IPostRepository } from "../repository";
import { POST_REPOSITORY } from "../repository";
import { getPlaiceholder } from "plaiceholder";
import type { PreviewData } from "next";

const isPreviewRefSafe = (preview: PreviewData): preview is Record<"ref", string> =>
  !!preview && typeof preview === "object" && "ref" in preview && typeof preview.ref === "string";

@injectable()
class PostService implements IPostService {
  constructor(@inject(POST_REPOSITORY) private readonly _repo: IPostRepository) {}

  async getAll(): Promise<PostPreviewModel[]> {
    const posts = await this._repo.list();

    return Promise.all(
      posts.map(async (post) => {
        const { base64 } = await getPlaiceholder(post.image.src);

        post.image.blurDataUrl = base64;

        return post;
      }),
    );
  }

  async getSlugByID(id: string): Promise<string | null> {
    const post = await this._repo.find({ id });

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

    await this.addImagePlaceholdersToPost(post);

    return post;
  }

  async addImagePlaceholdersToPost(post: PostWithContentModel) {
    const { base64 } = await getPlaiceholder(post.image.src);
    post.image.blurDataUrl = base64;

    // @ts-ignore
    post.content = await Promise.all(
      post.content.map(async (slice) => {
        if (slice.slice_type === "image_gallery") {
          slice.items = await Promise.all(
            slice.items.map(async (i) => {
              if (!i.gallery_image.url) {
                return i;
              }

              const { base64 } = await getPlaiceholder(i.gallery_image.url);

              // @ts-ignore
              i.gallery_image.blurDataUrl = base64;

              return i;
            }),
          );

          return slice;
        } else {
          return slice;
        }
      }),
    );
  }

  async getPreview(preview: PreviewData): Promise<PostWithContentModel | null> {
    const isRefSafe = isPreviewRefSafe(preview);

    if (!isRefSafe) {
      return null;
    }

    const post = await this._repo.find({ previewRef: preview.ref });

    if (post) {
      await this.addImagePlaceholdersToPost(post);
    }

    return post;
  }
}

export { PostService };
