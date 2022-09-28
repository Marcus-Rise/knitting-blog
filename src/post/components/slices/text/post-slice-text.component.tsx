import type { FC } from "react";
import type { PostDocumentDataBodyTextSlice } from "../../../../prismic";
import { isFilled } from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import styles from "./post-slice-text.module.scss";

const PostSliceText: FC<{ slice: PostDocumentDataBodyTextSlice }> = ({ slice }) =>
  isFilled.richText(slice.primary.text) ? (
    <div className={styles.wrapper}>
      <PrismicRichText field={slice.primary.text} />
    </div>
  ) : null;

export { PostSliceText };
