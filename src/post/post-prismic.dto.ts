import type { IPost } from "./post.interface";
import type { IPostPrismicDto } from "./post-prismic.dto.interface";
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
    this.title = dto.data.title[0].text;
    this.slug = dto.uid ?? dto.slugs[0];
    this.description = dto.data.description[0].text;
    this.imageSrc = dto.data.main_image.url;
    this.imageLabel = dto.data.main_image.alt ?? "";
    this.date = dto.first_publication_date ?? "";
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
  }
}

export { PostPrismicDto };
