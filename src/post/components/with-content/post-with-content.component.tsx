import type { FC } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import NextImage from "next/future/image";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

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
    <NextImage
      src={image.src}
      alt={image.alt}
      height={image.height}
      width={image.width}
      className={styles.image}
      priority
    />
    <SliceZone slices={content} components={components} />
    <DateComponent className={styles.datebottom} date={date} />
  </article>
);

export { PostWithContent };
