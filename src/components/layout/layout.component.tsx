import Head from "next/head";
import type { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { Header } from "../header/header.component";
import { Footer } from "../footer";

const Layout: FC<PropsWithChildren<{ title: string; authorName: string; authorLink: string }>> = ({
  title,
  authorLink,
  authorName,
  children,
}) => {
  const year = useMemo(() => new Date().getFullYear().toString(), []);

  return (
    <>
      <Head>
        <title key={"title"}>{title}</title>
        <meta key={"meta-title"} name={"title"} content={title} />
      </Head>
      <Header title={title} />
      <main>{children}</main>
      <Footer authorName={authorName} authorLink={authorLink} year={year} />
    </>
  );
};

export { Layout };
