import React from "react";
import type { IPost } from "../post.interface";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../components/hr";
import Image from "next/image";
import { DateToString } from "../../utils/date-to-string";
import { PostContent } from "./post-content";
import { ImageView } from "../../components/image-view";

type IProps = IPost;

const PostWithContent: React.FC<IProps> = (props) => {
  return (
    <>
      <h2 className={styles.title}>{props.title}</h2>
      <Hr />
      <p className={styles.meta}>{DateToString(props.date)}</p>
      {props.imageSrc && (
        <ImageView src={props.imageSrc} alt={props.imageLabel}>
          <div className={styles.image}>
            <Image
              src={props.imageSrc}
              alt={props.imageLabel}
              height={320}
              width={"auto"}
              layout={"responsive"}
              priority
            />
          </div>
        </ImageView>
      )}
      <p className={styles.imageLabel}>{props.imageLabel}</p>

      <PostContent content={props.content} />

      <p className={styles.footer}>{DateToString(props.date)}</p>
    </>
  );
};

export { PostWithContent };
