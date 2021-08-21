import type { FC } from "react";
import React from "react";
import Head from "next/head";

const PrismicToolbar: FC<{ repositoryName: string }> = ({ repositoryName }) => (
  <Head>
    <script
      async
      defer
      src={`https://static.cdn.prismic.io/prismic.js?new=true&repo=${repositoryName}`}
    />
  </Head>
);

export { PrismicToolbar };
