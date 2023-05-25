import type { FC } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import { Theme } from "../theme";
import { ThemeProvider } from "@marcus-rise/react-theme";
import { THEME_COOKIE_KEY } from "../theme/theme-config";

const Footer: FC<{ authorName: string; authorLink: string; year: string }> = ({
  authorName,
  authorLink,
  year,
}) => (
  <footer className={styles.footer}>
    <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
      <Theme className={styles.theme} />
    </ThemeProvider>
    <span>&#9400; {year}</span>
    <Link className={styles.link} href={authorLink} target={"_blank"} rel="noreferrer">
      {authorName}
    </Link>
  </footer>
);

export { Footer };
