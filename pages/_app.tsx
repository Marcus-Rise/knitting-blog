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
import type { ISeoConfigService } from "../src/seo";
import { SEO_CONFIG_SERVICE_PROVIDER } from "../src/seo";
import { VerificationCodes } from "../src/seo/verification-codes";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { title, author } = useInject<IAppService>(APP_SERVICE_PROVIDER);
  const { googleVerificationCode, yandexVerificationCode } = useInject<ISeoConfigService>(SEO_CONFIG_SERVICE_PROVIDER);

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
      <VerificationCodes googleCode={googleVerificationCode} yandexCode={yandexVerificationCode} />
      <Header title={title} logoSrc={"/logo.svg"} links={links} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer year={new Date().getFullYear()} author={author.name} authorLink={author.url} />
    </>
  );
};

export default MyApp;
