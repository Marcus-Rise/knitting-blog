import type { Document } from "prismic-javascript/types/documents";

interface IPostPrismicDto extends Document {
  data: {
    title: Array<{
      type: string;
      text: string;
      spans: unknown[];
    }>;
    main_image: {
      dimensions: {
        width: number;
        height: number;
      };
      alt: string;
      copyright: null;
      url: string;
    };
    description: Array<{
      type: string;
      text: string;
      spans: unknown[];
    }>;
    body: unknown[];
  };
}

export type { IPostPrismicDto };
