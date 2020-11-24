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
  const { siteConfig } = useInject<IAppService>(APP_SERVICE_PROVIDER);

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
        <title key={"title"}>{siteConfig.title}</title>
        <meta key={"meta-title"} name={"title"} content={siteConfig.title} />
      </Head>
      <Header title={siteConfig.title} logoSrc={"/logo.svg"} links={links} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer year={new Date().getFullYear()} author={siteConfig.author.name} authorLink={siteConfig.author.url} />
    </>
  );
};

export default MyApp;
