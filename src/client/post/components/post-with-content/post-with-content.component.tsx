import type { FC } from "react";
import React from "react";
import styles from "./post-with-content.module.scss";
import { Hr, ImageView } from "../../../components";
import Image from "next/image";
import { DateToString } from "../../../../common/utils/date-to-string";
import { PostContent } from "./post-content";
import type { IPost } from "../../../../common/post";

type IProps = IPost;

const PostWithContent: FC<IProps> = ({ content, date, imageLabel, imageSrc, title }) => (
  <>
    <h2 className={styles.title}>{title}</h2>
    <Hr />
    <p className={styles.meta}>{DateToString(date)}</p>
    {imageSrc && (
      <ImageView album={[{ src: imageSrc, alt: imageLabel }]}>
        <div className={styles.image}>
          <Image src={imageSrc} alt={imageLabel} layout={"fill"} priority />
        </div>
      </ImageView>
    )}
    <p className={styles.imageLabel}>{imageLabel}</p>

    <PostContent content={content} />

    <p className={styles.footer}>{DateToString(date)}</p>
  </>
);

export { PostWithContent };
