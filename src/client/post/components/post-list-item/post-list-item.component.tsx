import type { FC } from "react";
import React from "react";
import styles from "./post-list-item.module.scss";
import Image from "next/image";
import Link from "next/link";
import { DateToString } from "../../../../common/utils/date-to-string";
import { ImageView } from "../../../components";
import type { IPost } from "../../../../common/post";

interface IProps extends IPost {
  className?: string;
}

const PostListItem: FC<IProps> = ({
  className,
  date,
  description,
  imageLabel,
  imageSrc,
  slug,
  title,
}) => (
  <div className={className}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.meta}>{DateToString(date)}</p>
    <ImageView album={[{ src: imageSrc, alt: imageLabel }]}>
      <div className={styles.image}>
        <Image src={imageSrc} alt={imageLabel} layout={"fill"} priority />
      </div>
    </ImageView>
    <p className={styles.imageLabel}>{imageLabel}</p>
    <p className={styles.description}>{description}</p>
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className={styles.link}>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug },
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
