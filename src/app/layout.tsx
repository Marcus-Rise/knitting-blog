import type { FC, PropsWithChildren } from "react";
import { Bad_Script, Montserrat } from "next/font/google";
import classNames from "classnames";
import { config } from "../config";
import type { Metadata, Viewport } from "next";
import { Header } from "../components/header";
import styles from "./layout.module.scss";
import { Footer } from "../components/footer";
import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/react";
import { THEME_COOKIE_KEY, ThemeProvider } from "../components/theme";
import { YandexAnalytics } from "../yandex/analytics";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["cyrillic"],
  variable: "--montserrat",
  display: "swap",
});

const badScript = Bad_Script({
  weight: "400",
  subsets: ["cyrillic"],
  variable: "--bad-script",
  display: "swap",
});

const year = new Date().getFullYear().toString();

const analytics = process.env.ANALYTICS === "true";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang={"ru"} className={classNames(montserrat.variable, badScript.variable)}>
    <body>
      <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
        <Header title={config.title} />
        <main className={styles.main}>{children}</main>
        <Footer authorName={config.author.name} authorLink={config.author.url} year={year} />
      </ThemeProvider>
      {analytics && (
        <>
          <Analytics />
          <YandexAnalytics />
        </>
      )}
    </body>
  </html>
);

const feedTitle = `${config.title} | Все посты`;
const metadata: Metadata = {
  metadataBase: config.baseUrl,
  alternates: {
    canonical: config.baseUrl,
    types: {
      "application/rss+xml": [{ url: "/feed/rss.xml", title: feedTitle }],
      "application/atom+xml": [{ url: "/feed/atom.xml", title: feedTitle }],
      "application/feed+json": [{ url: "/feed", title: feedTitle }],
    },
  },
};

const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: "#fff",
};

export default RootLayout;
export { metadata, viewport };
