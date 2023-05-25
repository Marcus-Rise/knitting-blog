import type { FC } from "react";
import { Suspense } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import { components, SliceZone } from "../slices";
import { PostPrimaryImage } from "../primary-image";

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
    <Suspense>
      <PostPrimaryImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={styles.image}
        blurDataURL={image.blurDataUrl}
        priority
      />
    </Suspense>
    <Suspense>
      <SliceZone slices={content} components={components} />
    </Suspense>
    <DateComponent className={styles.datebottom} date={date} />
  </article>
);

export { PostWithContent };
