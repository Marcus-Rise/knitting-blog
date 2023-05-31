import type { FC } from "react";
import type { PostWithContentModel } from "../../model";
import { Title } from "../../../components/title";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../../components/hr";
import { DateComponent } from "../../../components/date";
import { components, SliceZone } from "../slices";
import { PostImage } from "../post-image";
import { TelegramIcon } from "../../../components/icons";
import dynamic from "next/dynamic";

const TelegramComments = dynamic(() => import("../../../telegram/components/comments"));
const TelegramShareButton = dynamic(() => import("../../../telegram/components/share-button"));

const TELEGRAM_COMMENTS_LIMIT = 5;

type Props = Omit<PostWithContentModel, "description">;

const PostWithContent: FC<Props> = ({ title, date, content, image, telegramPostUrl }) => (
  <article>
    <Title className={styles.title}>{title}</Title>
    <Hr />
    <div className={styles.meta}>
      {telegramPostUrl && (
        <TelegramShareButton className={styles.shareLink} url={telegramPostUrl}>
          Поделиться в Телеграм <TelegramIcon height={"1.5rem"} width={"1.5rem"} />
        </TelegramShareButton>
      )}
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
    {telegramPostUrl && (
      <TelegramComments telegramPostUrl={telegramPostUrl} commentsLimit={TELEGRAM_COMMENTS_LIMIT} />
    )}
  </article>
);

export { PostWithContent };
