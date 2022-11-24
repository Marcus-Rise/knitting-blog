import type { FC, PropsWithChildren } from "react";
import { Bad_Script, Montserrat } from "@next/font/google";
import classNames from "classnames";
import { Layout } from "../components/layout";
import { config } from "../config";
import "../styles/global.scss";
import { cookies, headers } from "next/headers";
import { THEME_COOKIE_KEY } from "../components/theme/theme-config";

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

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const userPreferColorScheme = cookies().get(THEME_COOKIE_KEY);
  const systemDefaultColorScheme = headers().get("sec-ch-prefers-color-scheme");
  const colorScheme = userPreferColorScheme?.value ?? systemDefaultColorScheme;

  return (
    <html data-theme={colorScheme} lang={"ru"}>
      <body className={classNames(montserrat.variable, badScript.variable)}>
        <Layout title={config.title} authorName={config.author.name} authorLink={config.author.url}>
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
