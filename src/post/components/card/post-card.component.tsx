import type { FC } from "react";
import styles from "./post-card.module.scss";
import type { PostPreviewModel } from "../../model";
import { Title } from "../../../components/title";
import { DateComponent } from "../../../components/date";
import Link from "next/link";
import { PostCardImage } from "./post-card-image.component";

type Props = PostPreviewModel & {
  priorityImage?: boolean;
};

const PostCard: FC<Props> = ({ title, description, slug, image, date, priorityImage }) => {
  return (
    <article className={styles.card}>
      <PostCardImage
        src={image.src}
        alt={image.alt}
        height={image.height}
        className={styles.image}
        priority={priorityImage}
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
};

export { PostCard };
