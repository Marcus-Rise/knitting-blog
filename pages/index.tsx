import "reflect-metadata";
import type { FC } from "react";
import React from "react";
import type { GetStaticProps } from "next";
import { PostList } from "../src/post/post-list";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import { inject } from "../src/ioc";
import type { IAppService } from "../src/app";
import { APP_SERVICE_PROVIDER } from "../src/app";
import type { ISeoConfigService } from "../src/seo";
import { SEO_CONFIG_SERVICE_PROVIDER } from "../src/seo";
import type { ILayoutProps } from "../src/components";
import { Layout } from "../src/components";
import { LINKS } from "../src/links";
import Head from "next/head";

interface IProps extends ILayoutProps {
  posts: Array<IPost>;
}

const getStaticProps: GetStaticProps<IProps> = async (
  _,
  app = inject<IAppService>(APP_SERVICE_PROVIDER),
  seo = inject<ISeoConfigService>(SEO_CONFIG_SERVICE_PROVIDER),
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
) => {
  const { title, author } = app;
  const { googleVerificationCode, yandexVerificationCode } = seo;

  return {
    props: {
      title,
      author,
      googleVerificationCode,
      yandexVerificationCode,
      links: LINKS,
      posts: await posts.getList(0, 5),
    },
    revalidate: 60,
  };
};

const Home: FC<IProps> = ({
  title,
  author,
  links,
  posts,
  googleVerificationCode,
  yandexVerificationCe,
}) => (
  <Layout
    title={title}
    author={author}
    links={links}
    googleVerificationCode={googleVerificationCode}
    yandexVerificationCode={yandexVerificationCode}
  >
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
