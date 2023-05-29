import type { FC } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import { components, SliceZone } from "../slices";
import { PostImage } from "../post-image";

const PostWithContent: FC<Omit<PostWithContentModel, "description">> = ({
  title,
  date,
  content,
  image,
}) => (
  <article>
    <Title className={styles.title}>{title}</Title>
    <Hr />
    <DateComponent className={styles.date} date={date} />
    <PostImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={"100vw"}
      className={styles.image}
      blurDataURL={image.blurDataUrl}
      priority
    />
    <SliceZone slices={content} components={components} />
    <DateComponent className={styles.datebottom} date={date} />
  </article>
);

export { PostWithContent };
