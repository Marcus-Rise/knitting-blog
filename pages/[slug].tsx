import "reflect-metadata";
import type { FC } from "react";
import React from "react";
import type { IAppService, IPostService, IPrismicConfigService } from "../src/server";
import {
  APP_SERVICE_PROVIDER,
  inject,
  POST_SERVICE_PROVIDER,
  PRISMIC_CONFIG_SERVICE_PROVIDER,
} from "../src/server";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import type { ILayoutProps } from "../src/client";
import { Layout, LINKS, PostWithContent, PreviewAlert, PrismicToolbar } from "../src/client";
import type { IPost } from "../src/common/post";

interface IProps {
  post: IPost | null;
  layout: ILayoutProps;
  isPreview: boolean;
  repoName: string;
}

const getStaticPaths: GetStaticPaths = async (
  _,
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
) => {
  await posts.load(0, 5);

  return {
    paths: posts.items.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

const getStaticProps: GetStaticProps<IProps> = async (
  context,
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
  app = inject<IAppService>(APP_SERVICE_PROVIDER),
  prismic = inject<IPrismicConfigService>(PRISMIC_CONFIG_SERVICE_PROVIDER),
) => {
  const { repoName } = prismic;
  const { title, author } = app;
  const isPreview = !!context.preview;

  let post: IPost | null;

  if (isPreview && typeof context.previewData === "object") {
    // @ts-ignore
    const { ref } = context.previewData;
    post = await posts.getPreview(ref);
  } else {
    post = await posts.getBySlug(String(context.params?.slug));
  }

  return {
    props: {
      layout: {
        title,
        author,
        links: LINKS,
      },
      post,
      isPreview,
      repoName,
    },
    notFound: !post,
    revalidate: 60,
  };
};

const PostPage: FC<IProps> = ({ layout, isPreview, post, repoName }) => {
  const { isFallback } = useRouter();

  return (
    <Layout {...layout}>
      {!isFallback && (
        <Head>
          <title key={"title"}>
            {layout.title} | {post?.title}
          </title>
          <meta key={"meta-title"} name={"title"} content={`${layout.title} | ${post?.title}`} />
          <meta key={"description"} name={"description"} content={post?.description} />
          <meta property="og:image" content={post?.imageSrc} />
        </Head>
      )}
      {post && isPreview && (
        <>
          <PreviewAlert title={post?.title} />
          <PrismicToolbar repositoryName={repoName} />
        </>
      )}
      <div style={{ marginTop: "3rem" }}>
        {isFallback ? <>Loading...</> : post && <PostWithContent {...post} />}
      </div>
    </Layout>
  );
};

export default PostPage;
export { getStaticProps, getStaticPaths };
