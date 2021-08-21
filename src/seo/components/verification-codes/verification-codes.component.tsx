import React from "react";
import Head from "next/head";

const VerificationCodes: React.FC<{ yandexCode: string; googleCode: string }> = (props) => {
  return (
    <Head>
      <meta name="google-site-verification" content={props.googleCode} />
      <meta name="yandex-verification" content={props.yandexCode} />
    </Head>
  );
};

export { VerificationCodes };
