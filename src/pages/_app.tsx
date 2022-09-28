import type { AppProps } from "next/app";
import type { FC } from "react";
import { Layout } from "../components/layout";
import "../styles/global.scss";
import { config } from "../config";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout title={config.title} authorName={config.author.name} authorLink={config.author.url}>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
