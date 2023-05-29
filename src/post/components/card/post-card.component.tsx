import type { FC } from "react";
import styles from "./post-card.module.scss";
import type { PostPreviewModel } from "../../model";
import { Title } from "../../../components/title";
import { DateComponent } from "../../../components/date";
import Link from "next/link";
import { PostImage } from "../post-image";

type Props = PostPreviewModel & {
  priorityImage?: boolean;
};

const PostCard: FC<Props> = ({ title, description, slug, image, date, priorityImage }) => (
  <article className={styles.card}>
    <PostImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 768px) 100vw, 35vw"
      className={styles.image}
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
