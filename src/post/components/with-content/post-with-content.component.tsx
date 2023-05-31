import type { FC } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import { components, SliceZone } from "../slices";
import { PostImage } from "../post-image";
import { TelegramShareButton } from "../../../telegram/components";
import { TelegramIcon } from "../../../components/icons";

type Props = Omit<PostWithContentModel, "description"> & {
  shareLink: string;
};

const PostWithContent: FC<Props> = ({ title, date, content, image, shareLink }) => (
  <article>
    <Title className={styles.title}>{title}</Title>
    <Hr />
    <div className={styles.meta}>
      <TelegramShareButton className={styles.shareLink} url={shareLink}>
        Поделиться в Телеграм <TelegramIcon height={"1.5rem"} width={"1.5rem"} />
      </TelegramShareButton>
      <DateComponent className={styles.date} date={date} />
    </div>
    <PostImage
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={"100vw"}
      className={styles.image}
      priority
    />
    <div>
      <SliceZone slices={content} components={components} />
    </div>
    <DateComponent className={styles.datebottom} date={date} />
  </article>
);

export { PostWithContent };
