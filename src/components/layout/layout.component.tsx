import type { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { Header } from "../header/header.component";
import { Footer } from "../footer";
import styles from "./layout.module.scss";
import { ThemeProvider } from "@marcus-rise/react-theme";
import { THEME_COOKIE_KEY } from "../theme/theme-config";

const Layout: FC<PropsWithChildren<{ title: string; authorName: string; authorLink: string }>> = ({
  title,
  authorLink,
  authorName,
  children,
}) => {
  const year = useMemo(() => new Date().getFullYear().toString(), []);

  return (
    <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
      <Header title={title} />
      <main className={styles.main}>{children}</main>
      <Footer authorName={authorName} authorLink={authorLink} year={year} />
    </ThemeProvider>
  );
};

export { Layout };
