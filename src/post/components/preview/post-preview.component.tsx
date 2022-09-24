import type { FC } from "react";
import NextImage from "next/future/image";
import styles from "./post-preview.module.scss";
import Link from "next/link";
import { useFormattedPostDate } from "../../date";

const Image: FC<{ alt: string; src: string }> = ({ src, alt }) => (
  <NextImage src={src} alt={alt} className={styles.image} />
);

const DateString: FC<{ date: Date }> = ({ date }) => {
  const { ui, html } = useFormattedPostDate(date);

  return (
    <time className={styles.date} dateTime={html}>
      {ui}
    </time>
  );
};

type Props = { imageSrc: string; title: string; description: string; slug: string; date: Date };

const PostPreview: FC<Props> = ({ title, description, slug, imageSrc, date }) => {
  const href = `/${slug}`;

  return (
    <div className={styles.title}>
      <Link href={href}>
        <Image src={imageSrc} alt={title} />
      </Link>
      <div className={styles.text}>
        <Link href={href}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <DateString date={date} />
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export { PostPreview };
