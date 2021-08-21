import "reflect-metadata";
import type { FC } from "react";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../src/client/styles";
import Head from "next/head";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyles />
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"crossorigin"} />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bad+Script&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
