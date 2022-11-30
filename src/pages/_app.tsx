import type { AppProps } from "next/app";
import type { FC } from "react";
import { useCallback, useEffect, useRef } from "react";
import { Layout } from "../components/layout";
import "../styles/global.scss";
import { config } from "../config";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import Link from "next/link";
import { linkResolver } from "../prismic/prismic-link-resolver";
import { ThemeProvider } from "@marcus-rise/react-theme";
import { THEME_COOKIE_KEY } from "../components/theme/theme-config";
import {
  isNotificationPermissionGranted,
  register,
  requestPermission,
  sendNotification,
} from "../notification";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const subscription = useRef<PushSubscription>();

  const checkPermission = useCallback(async (): Promise<void> => {
    if (!isNotificationPermissionGranted()) {
      const permission = await requestPermission();

      if (permission === "granted") {
        subscription.current = await register();
      }
    }
  }, []);

  const notify = async (): Promise<void> => {
    await checkPermission();

    if (subscription.current) {
      await sendNotification(subscription.current);
    }
  };

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <PrismicPreview repositoryName={process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY ?? ""}>
        <ThemeProvider cookiesKey={THEME_COOKIE_KEY}>
          <Layout
            title={config.title}
            authorName={config.author.name}
            authorLink={config.author.url}
          >
            <button style={{ backgroundColor: "var(--color-primary)" }} onClick={notify}>
              notify
            </button>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PrismicPreview>
    </PrismicProvider>
  );
};

export default MyApp;
