import type { FC } from "react";
import NextImage from "next/future/image";
import styles from "./post-card.module.scss";
import Link from "next/link";
import { useFormattedPostDate } from "../../date";
import type { PostPreviewModel } from "../../model";

const DateString: FC<{ date: string }> = ({ date }) => {
  const { ui, html } = useFormattedPostDate(date);

  return (
    <time className={styles.date} dateTime={html}>
      {ui}
    </time>
  );
};

type Props = PostPreviewModel & {
  priorityImage?: boolean;
};

const PostCard: FC<Props> = ({ title, description, slug, image, date, priorityImage }) => {
  const href = `/${slug}`;

  return (
    <div className={styles.card}>
      <NextImage
        src={image.src}
        alt={image.alt}
        height={300}
        width={500}
        className={styles.image}
        priority={priorityImage}
      />
      <div className={styles.text}>
        <Link href={href}>
          <a className={styles.link}>
            <h2 className={styles.title}>{title}</h2>
          </a>
        </Link>
        <DateString date={date} />
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export { PostCard };
