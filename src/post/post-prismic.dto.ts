import type { IPost } from "./post.interface";
import type { Image, IPostPrismicDto } from "./post-prismic.dto.interface";
import { SliceTypeEnum } from "./post-prismic.dto.interface";
import type { IImageGallery, IPostContent } from "./post-content.inteface";
import type { RichTextBlock } from "prismic-reactjs";

class PostPrismicDto implements IPost {
  date: string;
  description: string;
  imageLabel: string;
  imageSrc: string;
  slug: string;
  title: string;
  content: IPostContent;

  constructor(dto: IPostPrismicDto) {
    if (dto.data.title.length) {
      this.title = dto.data.title[0].text;
    } else {
      this.title = "";
    }

    if (dto.uid) {
      this.slug = dto.uid;
    } else if (dto.slugs.length) {
      this.slug = dto.slugs[0];
    } else {
      this.slug = "";
    }

    if (dto.data.description.length) {
      this.description = dto.data.description[0].text;
    } else {
      this.description = "";
    }

    if (PostPrismicDto.isMainImage(dto.data.main_image)) {
      this.imageSrc = dto.data.main_image.url;
      this.imageLabel = dto.data.main_image.alt ?? "";
    } else {
      this.imageSrc = "";
      this.imageLabel = "";
    }

    this.date = dto.first_publication_date ?? "";

    if (dto.data.body.length) {
      this.content = dto.data.body.flatMap<RichTextBlock | IImageGallery>((i) => {
        switch (i.slice_type) {
          case SliceTypeEnum.TEXT:
            return i.primary.text.flat();
          case SliceTypeEnum.IMAGE_GALLERY:
            return <IImageGallery>{
              type: i.slice_type,
              label: i.primary.name_of_the_gallery[0] ?? null,
              items: i.items.map((image) => ({
                alt: image.gallery_image.alt,
                url: image.gallery_image.url,
                height: image.gallery_image.dimensions.height,
                width: image.gallery_image.dimensions.width,
              })),
            };
          default:
            return [];
        }
      });
    } else {
      this.content = [];
    }
  }

  private static isMainImage(obj: Record<string, unknown> | Image): obj is Image {
    return "url" in obj;
  }
}

export { PostPrismicDto };
