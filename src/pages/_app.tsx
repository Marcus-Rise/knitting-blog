import type { AppProps } from "next/app";
import type { FC } from "react";
import { Layout } from "../components/layout";
import "../styles/global.scss";
import { config } from "../config";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import Link from "next/link";
import { linkResolver } from "../prismic/prismic-link-resolver";
import { ThemeProvider } from "@marcus-rise/react-theme";
import { THEME_COOKIE_KEY } from "../components/theme/theme-config";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <PrismicProvider
    linkResolver={linkResolver}
    internalLinkComponent={({ href, ...props }) => <Link href={href} {...props} />}
  >
    <PrismicPreview repositoryName={process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY ?? ""}>
      <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
        <Layout title={config.title} authorName={config.author.name} authorLink={config.author.url}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PrismicPreview>
  </PrismicProvider>
);

export default MyApp;
