import type { PostPreviewModel, PostWithContentModel } from "./model";
import { PostPreviewModelFactory, PostWithContentModelFactory } from "./model";
import type { PostDocument } from "../prismic";
import { createClient } from "../prismic/prismic-client";
import type { PreviewData } from "next/types";
import { getPlaiceholder } from "plaiceholder";

abstract class PostService {
  static async list(): Promise<PostPreviewModel[]> {
    const client = createClient();
    const dto: Array<PostDocument> = await client.getAllByType("post", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    });

    const posts = dto.map((i) => PostPreviewModelFactory.fromResponseDto(i));

    return Promise.all(
      posts.map(async (post) => {
        const { base64 } = await getPlaiceholder(post.image.src);

        post.image.blurDataUrl = base64;

        return post;
      }),
    );
  }

  static async find(uuid: string, previewData?: PreviewData): Promise<PostWithContentModel> {
    const client = createClient({ previewData });
    const dto: PostDocument = await client.getByUID("post", uuid);

    const post = PostWithContentModelFactory.fromResponseDto(dto);

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

    return post;
  }
}

export { PostService };
