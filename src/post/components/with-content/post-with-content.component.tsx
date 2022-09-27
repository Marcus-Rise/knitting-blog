import type { FC } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import NextImage from "next/future/image";

const PostWithContent: FC<Omit<PostWithContentModel, "description">> = ({
  title,
  date,
  content,
  image,
}) => {
  return (
    <>
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
    </>
  );
};

export { PostWithContent };
