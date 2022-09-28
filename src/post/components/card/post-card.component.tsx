import type { FC } from "react";
import NextImage from "next/future/image";
import styles from "./post-card.module.scss";
import Link from "next/link";
import type { PostPreviewModel } from "../../model";
import { Title } from "../../../components/title";
import { DateComponent } from "../../../components/date";
import { imageLoader } from "../../../prismic";

type Props = PostPreviewModel & {
  priorityImage?: boolean;
};

const PostCard: FC<Props> = ({ title, description, slug, image, date, priorityImage }) => (
  <article className={styles.card}>
    <NextImage
      src={image.src}
      alt={image.alt}
      height={image.height}
      width={image.width}
      className={styles.image}
      priority={priorityImage}
      sizes={"100vw"}
      loader={imageLoader}
      placeholder={"blur"}
      blurDataURL={image.blurDataUrl}
    />
    <div className={styles.text}>
      <Link
        href={{
          pathname: "/[slug]",
          query: { slug },
        }}
      >
        <a className={styles.link}>
          <Title>{title}</Title>
        </a>
      </Link>
      <DateComponent date={date} />
      <div className={styles.description}>{description}</div>
    </div>
  </article>
);

export { PostCard };
