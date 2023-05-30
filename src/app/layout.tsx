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
      <Header title={config.title} />
      <main className={styles.main}>{children}</main>
      <Footer authorName={config.author.name} authorLink={config.author.url} year={year} />
    </body>
  </html>
);

const generateMetadata = (): Metadata => {
  const host = headers().get("Host") ?? "";

  return {
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    openGraph: {
      title: config.title,
      description: config.title,
    },
    themeColor: "#fff",
    metadataBase: new URL(`https://${host}`),
  };
};

export default RootLayout;
export { generateMetadata };
