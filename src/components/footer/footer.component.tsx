import type { FC } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import { Theme } from "../theme";
import { TelegramIcon } from "../icons";

const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "#";

const Footer: FC<{ authorName: string; authorLink: string; year: string }> = ({
  authorName,
  authorLink,
  year,
}) => (
  <footer className={styles.footer}>
    <Link href={TELEGRAM_URL} className={styles.link}>
      Телеграм канал: <TelegramIcon height={"2rem"} width={"2rem"} />
    </Link>

    <div className={styles.links}>
      <Theme className={styles.theme} />
      <Link className={styles.link} href={authorLink} target={"_blank"} rel="noreferrer">
        &#9400; {year} {authorName}
      </Link>
    </div>
  </footer>
);

export { Footer };
