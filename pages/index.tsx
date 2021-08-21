import "reflect-metadata";
import type { FC } from "react";
import React from "react";
import type { GetStaticProps } from "next";
import type { IAppService, IPost, IPostService } from "../src/server";
import { APP_SERVICE_PROVIDER, inject, POST_SERVICE_PROVIDER, PostList } from "../src/server";
import type { ILayoutProps } from "../src/client";
import { Layout, LINKS } from "../src/client";
import Head from "next/head";

interface IProps {
  posts: Array<IPost>;
  layout: ILayoutProps;
}

const getStaticProps: GetStaticProps<IProps> = async (
  _,
  app = inject<IAppService>(APP_SERVICE_PROVIDER),
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
) => {
  const { title, author } = app;

  await posts.load(0, 5);

  return {
    props: {
      layout: {
        title,
        author,
        links: LINKS,
      },
      posts: [...posts.items],
    },
    revalidate: 60,
  };
};

const Home: FC<IProps> = ({ layout, posts }) => (
  <Layout {...layout}>
    <Head>
      <meta
        key={"description"}
        name={"description"}
        content={posts.map((i) => i.title.toLowerCase()).join(", ")}
      />
    </Head>
    <div className="container">
      <PostList items={posts} />
    </div>
  </Layout>
);

export { getStaticProps };
export default Home;
