import type { PostPreviewModel } from "./model";
import { PostPreviewModelFactory } from "./model";
import type { PostDocument } from "../prismic";
import { client } from "../prismic";

class PostService {
  static async getList(): Promise<PostPreviewModel[]> {
    const dto: Array<PostDocument> = await client.getAllByType("post");

    return dto.map((i) => PostPreviewModelFactory.fromResponseDto(i));
  }
}

export { PostService };
