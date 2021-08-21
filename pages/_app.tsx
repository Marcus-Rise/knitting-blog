import "reflect-metadata";
import type { FC } from "react";
import type { AppProps } from "next/app";
import "../src/client/styles/globals.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
