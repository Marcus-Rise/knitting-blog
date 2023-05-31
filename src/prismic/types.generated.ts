// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
};
/** Content for Post documents */
interface PostDocumentData {
  /**
   * Title field in *Post*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Заголовок
   * - **API ID Path**: post.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Telegram post url field in *Post*
   *
   * - **Field Type**: Link
   * - **Placeholder**: https://t.me/nadya_knitting/
   * - **API ID Path**: post.telegram_post_url
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  telegram_post_url: prismic.LinkField;
  /**
   * Main image field in *Post*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: post.main_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  main_image: prismic.ImageField<never>;
  /**
   * Description field in *Post*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: post.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.TitleField;
  /**
   * Slice zone field in *Post*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: post.body[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  body: prismic.SliceZone<PostDocumentDataBodySlice>;
}
/**
 * Primary content in Post → Slice zone → `text` → Primary
 *
 */
interface PostDocumentDataBodyTextSlicePrimary {
  /**
   * text field in *Post → Slice zone → `text` → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Your content here
   * - **API ID Path**: post.body[].text.primary.text
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  text: prismic.RichTextField;
}
export type PostDocumentDataBodyTextSlice = prismic.Slice<
  "text",
  Simplify<PostDocumentDataBodyTextSlicePrimary>,
  never
>;
/**
 * Primary content in Post → Slice zone → `image_gallery` → Primary
 *
 */
interface PostDocumentDataBodyImageGallerySlicePrimary {
  /**
   * Name of the gallery field in *Post → Slice zone → `image_gallery` → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: My beautiful paintings
   * - **API ID Path**: post.body[].image_gallery.primary.name_of_the_gallery
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  name_of_the_gallery: prismic.TitleField;
}
/**
 * Item in Post → Slice zone → `image_gallery` → Items
 *
 */
export interface PostDocumentDataBodyImageGallerySliceItem {
  /**
   * Image captions field in *Post → Slice zone → `image_gallery` → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Images captions
   * - **API ID Path**: post.body[].image_gallery.items[].image_captions
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  image_captions: prismic.RichTextField;
  /**
   * Gallery Image field in *Post → Slice zone → `image_gallery` → Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: post.body[].image_gallery.items[].gallery_image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  gallery_image: prismic.ImageField<never>;
}
export type PostDocumentDataBodyImageGallerySlice = prismic.Slice<
  "image_gallery",
  Simplify<PostDocumentDataBodyImageGallerySlicePrimary>,
  Simplify<PostDocumentDataBodyImageGallerySliceItem>
>;
/**
 * Slice for *Post → Slice zone*
 *
 */
type PostDocumentDataBodySlice =
  | PostDocumentDataBodyTextSlice
  | PostDocumentDataBodyImageGallerySlice;
/**
 * Post document from Prismic
 *
 * - **API ID**: `post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<PostDocumentData>,
  "post",
  Lang
>;
export type AllDocumentTypes = PostDocument;
declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      PostDocumentData,
      PostDocumentDataBodyTextSlicePrimary,
      PostDocumentDataBodyTextSlice,
      PostDocumentDataBodyImageGallerySlicePrimary,
      PostDocumentDataBodyImageGallerySliceItem,
      PostDocumentDataBodyImageGallerySlice,
      PostDocumentDataBodySlice,
      PostDocument,
      AllDocumentTypes,
    };
  }
}
