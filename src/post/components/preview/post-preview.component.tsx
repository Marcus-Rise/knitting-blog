import type { FC, PropsWithChildren } from "react";
import NextImage from "next/future/image";
import styles from "./post-preview.module.scss";
import Link from "next/link";
import { useFormattedPostDate } from "../../date";

const Card: FC<PropsWithChildren> = ({ children }) => <div className={styles.card}>{children}</div>;

const Text: FC<PropsWithChildren> = ({ children }) => <div className={styles.text}>{children}</div>;

const Image: FC<{ alt: string; src: string }> = ({ src, alt }) => (
  <NextImage src={src} alt={alt} className={styles.image} />
);

const Title: FC<PropsWithChildren> = ({ children }) => <h2 className={styles.title}>{children}</h2>;

const Description: FC<PropsWithChildren> = ({ children }) => (
  <p className={styles.description}>{children}</p>
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
    <Card>
      <Link href={href}>
        <Image src={imageSrc} alt={title} />
      </Link>
      <Text>
        <Link href={href}>
          <Title>{title}</Title>
        </Link>
        <DateString date={date} />
        <Description>{description}</Description>
      </Text>
    </Card>
  );
};

export { PostPreview };
