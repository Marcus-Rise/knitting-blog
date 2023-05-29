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

  async getImagePlaceholder(src: string): Promise<string> {
    const url = new URL(src);
    url.searchParams.set("auto", "compress,format,enhance");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("crop", "entropy");
    url.searchParams.set("q", "20");

    const response = await fetch(url.toString());
    const buffer = Buffer.from(await response.arrayBuffer());

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  }

  async getAll(withoutPlaceholder = false): Promise<PostPreviewModel[]> {
    const posts = await this._repo.list();

    if (withoutPlaceholder) {
      return posts;
    }

    return Promise.all(
      posts.map(async (post) => {
        post.image.blurDataUrl = await this.getImagePlaceholder(post.image.src);

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
    post.image.blurDataUrl = await this.getImagePlaceholder(post.image.src);

    // @ts-ignore
    post.content = await Promise.all(
      post.content.map(async (slice) => {
        if (slice.slice_type === "image_gallery") {
          slice.items = await Promise.all(
            slice.items.map(async (i) => {
              if (!i.gallery_image.url) {
                return i;
              }

              // @ts-ignore
              i.gallery_image.blurDataUrl = await this.getImagePlaceholder(i.gallery_image.url);

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
