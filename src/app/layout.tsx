import type { FC, PropsWithChildren } from "react";
import { Bad_Script, Montserrat } from "@next/font/google";
import classNames from "classnames";
import { Layout } from "../components/layout";
import { config } from "../config";
import "../styles/global.scss";

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
  <html lang={"ru"}>
    <body className={classNames(montserrat.variable, badScript.variable)}>
      <Layout title={config.title} authorName={config.author.name} authorLink={config.author.url}>
        {children}
      </Layout>
    </body>
  </html>
);

export default RootLayout;
