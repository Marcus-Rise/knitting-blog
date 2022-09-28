import type { PostPreviewModel, PostWithContentModel } from "./model";
import { PostPreviewModelFactory, PostWithContentModelFactory } from "./model";
import type { PostDocument } from "../prismic";
import { createClient } from "../prismic/prismic-client";
import type { PreviewData } from "next/types";

abstract class PostService {
  static async list(): Promise<PostPreviewModel[]> {
    const client = createClient();
    const dto: Array<PostDocument> = await client.getAllByType("post", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    });

    return dto.map((i) => PostPreviewModelFactory.fromResponseDto(i));
  }

  static async find(uuid: string, previewData?: PreviewData): Promise<PostWithContentModel> {
    const client = createClient({ previewData });
    const dto: PostDocument = await client.getByUID("post", uuid);

    return PostWithContentModelFactory.fromResponseDto(dto);
  }
}

export { PostService };
