import type { FC } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import { Theme, ThemeProvider } from "../theme";
import { THEME_COOKIE_KEY } from "../theme/theme-config";
import { TelegramIcon } from "../icons";

const TELEGRAM_URL = process.env.TELEGRAM_URL ?? "#";

const Footer: FC<{ authorName: string; authorLink: string; year: string }> = ({
  authorName,
  authorLink,
  year,
}) => (
  <footer className={styles.footer}>
    <Link href={TELEGRAM_URL}>
      <TelegramIcon height={"2rem"} width={"2rem"} />
    </Link>

    <div className={styles.links}>
      <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
        <Theme className={styles.theme} />
      </ThemeProvider>
      <div>
        <span>&#9400; {year} </span>
        <Link className={styles.link} href={authorLink} target={"_blank"} rel="noreferrer">
          {authorName}
        </Link>
      </div>
    </div>
  </footer>
);

export { Footer };
