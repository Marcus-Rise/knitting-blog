import type { AppProps } from "next/app";
import type { FC } from "react";
import { Layout } from "../components/layout";
import manifest from "../../package.json";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout title={"Надя вяжет"} authorName={manifest.author.name} authorLink={manifest.author.url}>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
