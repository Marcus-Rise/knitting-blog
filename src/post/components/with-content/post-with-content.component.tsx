import type { FC } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import { components, SliceZone } from "../slices";
import { PostWithContentImage } from "./post-with-content-image.component";

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
    <PostWithContentImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      className={styles.image}
      blurDataURL={image.blurDataUrl}
    />
    <SliceZone slices={content} components={components} />
    <DateComponent className={styles.datebottom} date={date} />
  </article>
);

export { PostWithContent };
