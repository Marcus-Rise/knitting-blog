import type { FC, PropsWithChildren } from "react";
import { useEffect, useMemo } from "react";
import { Header } from "../header/header.component";
import { Footer } from "../footer";
import styles from "./layout.module.scss";
import { useTheme } from "@marcus-rise/react-theme";

const Layout: FC<PropsWithChildren<{ title: string; authorName: string; authorLink: string }>> = ({
  title,
  authorLink,
  authorName,
  children,
}) => {
  const { isDarkTheme } = useTheme();
  const year = useMemo(() => new Date().getFullYear().toString(), []);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkTheme]);

  return (
    <>
      <Header title={title} />
      <main className={styles.main}>{children}</main>
      <Footer authorName={authorName} authorLink={authorLink} year={year} />
    </>
  );
};

export { Layout };
