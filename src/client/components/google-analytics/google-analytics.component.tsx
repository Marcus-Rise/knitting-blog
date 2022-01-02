import type { FC } from "react";
import { useEffect } from "react";
import { initGoogleAnalytics } from "./google-analytics.helper";

const id = `G-EFW0GXEWHE`;

const GoogleAnalytics: FC = () => {
  useEffect(() => {
    initGoogleAnalytics(id);
  }, []);

  return <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />;
};

export { GoogleAnalytics };
