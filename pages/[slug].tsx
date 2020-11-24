import "reflect-metadata";
import React from "react";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import type { GetStaticPaths, GetStaticProps } from "next";
import { inject, useInject } from "../src/ioc";
import { useRouter } from "next/router";
import { PostWithContent } from "../src/post/post-with-content";
import type { IAppService } from "../src/app";
import { APP_SERVICE_PROVIDER } from "../src/app";
import Head from "next/head";

interface IProps {
  post: IPost | null;
}

const getStaticPaths: GetStaticPaths = async () => {
  const postService = inject<IPostService>(POST_SERVICE_PROVIDER);
  const posts = await postService.getList(0, 5);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const postService = inject<IPostService>(POST_SERVICE_PROVIDER);

  const post = await postService.getBySlug(String(context.params?.slug));

  return {
    props: {
      post,
    },
    notFound: !post,
    revalidate: 60,
  };
};

const PostPage: React.FC<IProps> = (props) => {
  const { siteConfig } = useInject<IAppService>(APP_SERVICE_PROVIDER);
  const { isFallback } = useRouter();

  return (
    <>
      {!isFallback && (
        <Head>
          <title key={"title"}>
            {siteConfig.title} | {props.post?.title}
          </title>
          <meta key={"meta-title"} name={"title"} content={`${siteConfig.title} | ${props.post?.title}`} />
          <meta key={"description"} name={"description"} content={props.post?.description} />
        </Head>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ marginTop: "3rem" }}>
            {isFallback ? <>Loading...</> : props.post && <PostWithContent {...props.post} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
export { getStaticProps, getStaticPaths };
