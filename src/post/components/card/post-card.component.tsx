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
    <Link className={styles.link} href={"/" + slug}>
      <PostImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 425px) 100vw, (max-width: 768px) 55vw, 35vw"
        priority={priorityImage}
        className={styles.image}
      />
    </Link>
    <div className={styles.text}>
      <Link className={styles.link} href={"/" + slug}>
        <Title>{title}</Title>
      </Link>
      <DateComponent date={date} />
      <div className={styles.description}>{description}</div>
      <Link className={styles.link} href={"/" + slug}>
        <span className={styles.read}>Читать&nbsp;далее</span>
      </Link>
    </div>
  </article>
);

export { PostCard };
