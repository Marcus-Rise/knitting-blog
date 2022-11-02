import type { FC, PropsWithChildren } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import styles from "./layout.module.scss";

const year = new Date().getFullYear().toString();

const Layout: FC<PropsWithChildren<{ title: string; authorName: string; authorLink: string }>> = ({
  title,
  authorLink,
  authorName,
  children,
}) => (
  <>
    <Header title={title} />
    <main className={styles.main}>{children}</main>
    <Footer authorName={authorName} authorLink={authorLink} year={year} />
  </>
);

export { Layout };
