import type { FC, PropsWithChildren } from "react";
import { Bad_Script, Montserrat } from "@next/font/google";
import classNames from "classnames";
import { Layout as LayoutBase } from "../components/layout";
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

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang={"ru"}>
    <head />
    <body className={classNames(montserrat.variable, badScript.variable)}>
      <LayoutBase
        title={config.title}
        authorName={config.author.name}
        authorLink={config.author.url}
      >
        {children}
      </LayoutBase>
    </body>
  </html>
);

export default Layout;
