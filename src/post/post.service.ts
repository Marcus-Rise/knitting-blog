import type { PostPreviewModel, PostWithContentModel } from "./model";
import { PostPreviewModelFactory, PostWithContentModelFactory } from "./model";
import type { PostDocument } from "../prismic";
import { client } from "../prismic/prismic-client";

abstract class PostService {
  static async list(): Promise<PostPreviewModel[]> {
    const dto: Array<PostDocument> = await client.getAllByType("post", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    });

    return dto.map((i) => PostPreviewModelFactory.fromResponseDto(i));
  }

  static async find(uuid: string): Promise<PostWithContentModel> {
    const dto: PostDocument = await client.getByUID("post", uuid);

    return PostWithContentModelFactory.fromResponseDto(dto);
  }
}

export { PostService };
