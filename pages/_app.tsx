import React from "react";
import Head from "next/head";
import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import { Footer } from "../src/components/footer";
import { Header } from "../src/components/header";
import type { INavLink } from "../src/components/nav";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const links: Array<INavLink> = [
    {
      title: "Главная",
      link: "#",
    },
    {
      title: "Главная2",
      link: "#",
    },
    {
      title: "Главная3",
      link: "#",
    },
    {
      title: "Главная4",
      link: "#",
    },
  ];

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Header title={"Nadya’s knits"} logoSize={125} logoSrc={"/logo.svg"} links={links} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer year={new Date().getFullYear()} author={"Ilya Konstantinov"} authorLink={"https://marcus-rise.dev"} />
    </>
  );
};

export default MyApp;
