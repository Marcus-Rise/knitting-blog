import "reflect-metadata";
import type { FC } from "react";
import React from "react";
import type { GetStaticProps } from "next";
import type { IAppService, IPostService } from "../src/server";
import { APP_SERVICE_PROVIDER, inject, POST_SERVICE_PROVIDER } from "../src/server";
import type { ILayoutProps } from "../src/client";
import { Layout, LINKS, PostList } from "../src/client";
import Head from "next/head";
import type { IPostList } from "../src/common/post";

interface IProps {
  posts: IPostList;
  layout: ILayoutProps;
}

const getStaticProps: GetStaticProps<IProps> = async (
  _,
  app = inject<IAppService>(APP_SERVICE_PROVIDER),
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
) => {
  const { title, author } = app;

  await posts.load();

  return {
    props: {
      layout: {
        title,
        author,
        links: LINKS,
      },
      posts: posts.items,
    },
    revalidate: 60,
  };
};

const Home: FC<IProps> = ({ layout, posts }) => {
  const [firstPost] = posts;

  return (
    <Layout {...layout}>
      <Head>
        <meta
          key={"description"}
          name={"description"}
          content={posts.map((i) => i.title.toLowerCase()).join(", ")}
        />
        <meta property="og:image" content={firstPost?.imageSrc} />
      </Head>
      <PostList items={posts} />
    </Layout>
  );
};

export { getStaticProps };
export default Home;
