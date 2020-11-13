import React from "react";
import styles from "./post-list-item.module.scss";
import type { IPost } from "../post.interface";
import Image from "next/image";

interface IProps extends IPost {
  className?: string;
}

const PostListItem: React.FC<IProps> = (props) => (
  <div className={[props.className, styles.root].join(" ")}>
    <h2 className={styles.title}>{props.title}</h2>
    <p className={styles.meta}>{props.date}</p>
    <div className={styles.image}>
      <Image src={props.imageSrc} alt={props.imageLabel} height={320} width={"auto"} layout={"responsive"} />
    </div>
    <p className={styles.imageLabel}>{props.imageLabel}</p>
    <p className={styles.description}>{props.description}</p>
    <div className="row justify-content-center">
      <div className="col-auto">
        <a className={styles.link} href={"/" + props.slug}>
          Читать далее
        </a>
      </div>
    </div>
  </div>
);

export { PostListItem };
