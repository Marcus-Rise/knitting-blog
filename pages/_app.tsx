import React from "react";
import Head from "next/head";
import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import { Footer } from "../src/components/footer";
import { Header } from "../src/components/header";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Blog</title>
    </Head>
    <Header title={"Nadya’s knits"} logoSize={125} logoSrc={"/logo.svg"} />
    <main>
      <Component {...pageProps} />
    </main>
    <Footer year={new Date().getFullYear()} author={"Ilya Konstantinov"} authorLink={"https://marcus-rise.dev"} />
  </>
);

export default MyApp;
