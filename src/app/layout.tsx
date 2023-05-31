import type { FC, PropsWithChildren } from "react";
import { Bad_Script, Montserrat } from "next/font/google";
import classNames from "classnames";
import { config } from "../config";
import type { Metadata } from "next";
import { Header } from "../components/header";
import styles from "./layout.module.scss";
import { Footer } from "../components/footer";
import "../styles/global.scss";
import { headers } from "next/headers";
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

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang={"ru"} className={classNames(montserrat.variable, badScript.variable)}>
    <body>
      <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
        <Header title={config.title} />
        <main className={styles.main}>{children}</main>
        <Footer authorName={config.author.name} authorLink={config.author.url} year={year} />
      </ThemeProvider>
      <Analytics />
      <YandexAnalytics />
    </body>
  </html>
);

const generateMetadata = (): Metadata => {
  const host = headers().get("Host") ?? "";
  const base = new URL(`https://${host}`);

  return {
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    themeColor: "#fff",
    metadataBase: base,
  };
};

export default RootLayout;
export { generateMetadata };
