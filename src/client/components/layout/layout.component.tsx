import type { FC } from "react";
import React from "react";
import Head from "next/head";
import type { IAppAuthor } from "../../../server";
import type { INavLink } from "../nav";
import { Header } from "../header";
import { Footer } from "../footer";
import { GlobalStyles } from "../../styles";

interface ILayoutProps {
  title: string;
  author: IAppAuthor;
  links: ReadonlyArray<INavLink>;
}

const Layout: FC<ILayoutProps> = ({ title, author, links, children }) => (
  <>
    <GlobalStyles />
    <Head>
      <title key={"title"}>{title}</title>
      <meta key={"meta-title"} name={"title"} content={title} />
      <meta name="theme-color" content={"#fff"} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    {!!links && <Header title={title} links={links} />}
    <main>{children}</main>
    {!!author && (
      <Footer year={new Date().getFullYear()} author={author.name} authorLink={author.url} />
    )}
  </>
);

export { Layout };
export type { ILayoutProps };
