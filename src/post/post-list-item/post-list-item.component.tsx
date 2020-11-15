import React from "react";
import styles from "./post-list-item.module.scss";
import type { IPost } from "../post.interface";
import Image from "next/image";
import Link from "next/link";
import { DateToString } from "../../utils/date-to-string";

interface IProps extends IPost {
  className?: string;
}

const PostListItem: React.FC<IProps> = (props) => (
  <div className={[props.className, styles.root].join(" ")}>
    <h2 className={styles.title}>{props.title}</h2>
    <p className={styles.meta}>{DateToString(props.date)}</p>
    <div className={styles.image}>
      <Image src={props.imageSrc} alt={props.imageLabel} height={"auto"} width={"auto"} layout={"responsive"} />
    </div>
    <p className={styles.imageLabel}>{props.imageLabel}</p>
    <p className={styles.description}>{props.description}</p>
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className={styles.link}>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: props.slug },
            }}
          >
            Читать далее
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export { PostListItem };
