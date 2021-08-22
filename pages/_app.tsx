import "reflect-metadata";
import type { FC } from "react";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../src/client/styles";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default MyApp;
