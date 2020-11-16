import React from "react";
import type { IPost } from "../post.interface";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../components/hr";
import Image from "next/image";
import { DateToString } from "../../utils/date-to-string";
import { PostContent } from "./post-content";

type IProps = IPost;

const PostWithContent: React.FC<IProps> = (props) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{props.title}</h2>
      <Hr />
      <p className={styles.meta}>{DateToString(props.date)}</p>
      <Image src={props.imageSrc} alt={props.imageLabel} height={320} width={"auto"} layout={"responsive"} />

      <PostContent content={props.content} />

      <p className={styles.footer}>{DateToString(props.date)}</p>
    </div>
  );
};

export { PostWithContent };
