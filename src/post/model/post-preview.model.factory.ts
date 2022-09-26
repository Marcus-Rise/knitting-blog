import type { PostPreviewModel } from "./post-preview.model";
import type { PostDocument } from "../../prismic";

class PostPreviewModelFactory {
  static fromResponseDto(dto: PostDocument): PostPreviewModel {
    const title = dto.data.title.at(0)?.text ?? "";

    return {
      title,
      description: dto.data.description.at(0)?.text ?? "",
      slug: dto.uid,
      image: {
        src: dto.data.main_image.url ?? "",
        alt: dto.data.main_image.alt ?? title,
        height: dto.data.main_image.dimensions?.height ?? 0,
        width: dto.data.main_image.dimensions?.width ?? 0,
      },
      date: dto.first_publication_date,
    };
  }
}

export { PostPreviewModelFactory };
