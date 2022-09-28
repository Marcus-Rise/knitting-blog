import type { AppProps } from "next/app";
import type { FC } from "react";
import { Layout } from "../components/layout";
import "../styles/global.scss";
import { config } from "../config";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import Link from "next/link";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <PrismicProvider
    internalLinkComponent={({ href, ...props }) => (
      <Link href={href}>
        <a {...props} />
      </Link>
    )}
  >
    <PrismicPreview repositoryName={process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY ?? ""}>
      <Layout title={config.title} authorName={config.author.name} authorLink={config.author.url}>
        <Component {...pageProps} />
      </Layout>
    </PrismicPreview>
  </PrismicProvider>
);

export default MyApp;
