import React from "react";
import Head from "next/head";

const PrismicToolbar: React.FC<{ repositoryName: string }> = (props) => (
  <Head>
    <script
      async
      defer
      src={`https://static.cdn.prismic.io/prismic.js?new=true&repo=${props.repositoryName}`}
    />
  </Head>
);

export { PrismicToolbar };
