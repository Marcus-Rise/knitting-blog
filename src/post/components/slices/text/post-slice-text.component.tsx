"use client";

import type { FC } from "react";
import type { PostDocumentDataBodyTextSlice } from "../../../../prismic";
import { isFilled } from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";

const PostSliceText: FC<{ slice: PostDocumentDataBodyTextSlice }> = ({ slice }) =>
  isFilled.richText(slice.primary.text) ? <PrismicRichText field={slice.primary.text} /> : null;

export { PostSliceText };
