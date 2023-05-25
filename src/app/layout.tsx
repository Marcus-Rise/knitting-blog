import type { FC, PropsWithChildren } from "react";
import { Bad_Script, Montserrat } from "next/font/google";
import classNames from "classnames";
import { Layout } from "../components/layout";
import { config } from "../config";
import "../styles/global.scss";
import type { Metadata } from "next";
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

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang={"ru"} className={classNames(montserrat.variable, badScript.variable)}>
    <body>
      <Layout title={config.title} authorName={config.author.name} authorLink={config.author.url}>
        {children}
      </Layout>
    </body>
  </html>
);

const generateMetadata = (): Metadata => {
  const host = headers().get("Host") ?? "";

  return {
    title: config.title,
    description: config.title,
    keywords: config.title.split(" "),
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
