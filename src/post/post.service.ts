import type { PostPreviewModel } from "./model";
import { PostPreviewModelFactory } from "./model";
import type { PostDocument } from "../prismic";
import { client } from "../prismic/prismic-client";

class PostService {
  static async getList(): Promise<PostPreviewModel[]> {
    const dto: Array<PostDocument> = await client.getAllByType("post", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    });

    return dto.map((i) => PostPreviewModelFactory.fromResponseDto(i));
  }
}

export { PostService };
