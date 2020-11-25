import "reflect-metadata";
import React from "react";
import type { GetStaticProps } from "next";
import { PostList } from "../src/post/post-list";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import { inject, useInject } from "../src/ioc";
import Head from "next/head";
import type { IAppService } from "../src/app";
import { APP_SERVICE_PROVIDER } from "../src/app";

interface IProps {
  posts: Array<IPost>;
}

const getStaticProps: GetStaticProps<IProps> = async () => {
  const postService = inject<IPostService>(POST_SERVICE_PROVIDER);

  return {
    props: {
      posts: await postService.getList(0, 5),
    },
    revalidate: 60,
  };
};

const Home: React.FC<IProps> = (props) => {
  const { title } = useInject<IAppService>(APP_SERVICE_PROVIDER);

  return (
    <>
      <Head>
        <title key={"title"}>{title}</title>
        <meta key={"meta-title"} name={"title"} content={title} />
        <meta
          key={"description"}
          name={"description"}
          content={props.posts.map((i) => i.title.toLowerCase()).join(", ")}
        />
      </Head>
      <div className="container">
        <PostList items={props.posts} />
      </div>
    </>
  );
};

export { getStaticProps };
export default Home;
