import "reflect-metadata";
import React from "react";
import Head from "next/head";
import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import { Footer } from "../src/components/footer";
import { Header } from "../src/components/header";
import type { INavLink } from "../src/components/nav";
import { useInject } from "../src/ioc";
import type { IAppService } from "../src/app";
import { APP_SERVICE_PROVIDER } from "../src/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { title, author } = useInject<IAppService>(APP_SERVICE_PROVIDER);

  const links: Array<INavLink> = [
    {
      title: "Главная",
      link: "/",
    },
    {
      title: "Шапочки",
      link: "/",
    },
    {
      title: "Шарфы",
      link: "/",
    },
    {
      title: "Свитера",
      link: "/",
    },
    {
      title: "Жакеты",
      link: "/",
    },
  ];

  return (
    <>
      <Head>
        <title key={"title"}>{title}</title>
        <meta key={"meta-title"} name={"title"} content={title} />
      </Head>
      <Header title={title} logoSrc={"/logo.svg"} links={links} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer year={new Date().getFullYear()} author={author.name} authorLink={author.url} />
    </>
  );
};

export default MyApp;
