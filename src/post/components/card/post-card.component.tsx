import type { FC } from "react";
import NextImage from "next/image";
import styles from "./post-card.module.scss";
import type { PostPreviewModel } from "../../model";
import { Title } from "../../../components/title";
import { DateComponent } from "../../../components/date";
import Link from "next/link";
import { imageLoader } from "../../../prismic";

type Props = PostPreviewModel & {
  priorityImage?: boolean;
};

const IMAGE_SIZE = 500;
const IMAGE_QUALITY = 60;

const PostCard: FC<Props> = ({ title, description, slug, image, date, priorityImage }) => {
  return (
    <article className={styles.card}>
      <NextImage
        src={image.src}
        alt={image.alt}
        height={image.height}
        width={IMAGE_SIZE}
        className={styles.image}
        priority={priorityImage}
        placeholder={"blur"}
        blurDataURL={image.blurDataUrl}
        loader={imageLoader(IMAGE_SIZE, IMAGE_SIZE)}
        quality={IMAGE_QUALITY}
      />
      <div className={styles.text}>
        <Link className={styles.link} href={"/" + slug}>
          <Title>{title}</Title>
        </Link>
        <DateComponent date={date} />
        <div className={styles.description}>{description}</div>
      </div>
    </article>
  );
};

export { PostCard };
