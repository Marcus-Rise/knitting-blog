import type { FC } from "react";
import NextImage from "next/image";
import styles from "./post-card.module.scss";
import type { PostPreviewModel } from "../../model";
import { Title } from "../../../components/title";
import { DateComponent } from "../../../components/date";
import Link from "next/link";

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
      placeholder={"blur"}
      blurDataURL={image.blurDataUrl}
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

export { PostCard };
