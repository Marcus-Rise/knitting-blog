import "reflect-metadata";
import type { FC } from "react";
import React from "react";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import type { GetStaticPaths, GetStaticProps } from "next";
import { inject } from "../src/ioc";
import { useRouter } from "next/router";
import { PostWithContent } from "../src/post/post-with-content";
import type { IAppService } from "../src/app";
import { APP_SERVICE_PROVIDER } from "../src/app";
import Head from "next/head";
import type { IPrismicConfigService } from "../src/prismic/prismic-config.service.interface";
import { PRISMIC_CONFIG_SERVICE_PROVIDER } from "../src/prismic/prismic-config.service.interface";
import { PreviewAlert } from "../src/components/preview-alert";
import { PrismicToolbar } from "../src/prismic/prismic-toolbar";
import type { ILayoutProps } from "../src/components";
import { Layout } from "../src/components";
import type { ISeoConfigService } from "../src/seo";
import { SEO_CONFIG_SERVICE_PROVIDER } from "../src/seo";
import { LINKS } from "../src/links";

interface IProps extends ILayoutProps {
  post: IPost | null;
  isPreview: boolean;
  repoName: string;
}

const getStaticPaths: GetStaticPaths = async (
  _,
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
) => {
  const items = await posts.getList(0, 5);

  return {
    paths: items.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

const getStaticProps: GetStaticProps<IProps> = async (
  context,
  posts = inject<IPostService>(POST_SERVICE_PROVIDER),
  app = inject<IAppService>(APP_SERVICE_PROVIDER),
  seo = inject<ISeoConfigService>(SEO_CONFIG_SERVICE_PROVIDER),
  prismic = inject<IPrismicConfigService>(PRISMIC_CONFIG_SERVICE_PROVIDER),
) => {
  const { repoName } = prismic;
  const { title, author } = app;
  const { googleVerificationCode, yandexVerificationCode } = seo;
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
      title,
      author,
      googleVerificationCode,
      yandexVerificationCode,
      links: LINKS,
      post,
      isPreview,
      repoName,
    },
    notFound: !post,
    revalidate: 60,
  };
};

const PostPage: FC<IProps> = ({
  title,
  author,
  links,
  googleVerificationCode,
  yandexVerificationCode,
  isPreview,
  post,
  repoName,
}) => {
  const { isFallback } = useRouter();

  return (
    <Layout
      title={title}
      author={author}
      links={links}
      googleVerificationCode={googleVerificationCode}
      yandexVerificationCode={yandexVerificationCode}
    >
      {!isFallback && (
        <Head>
          <title key={"title"}>
            {title} | {post?.title}
          </title>
          <meta key={"meta-title"} name={"title"} content={`${title} | ${post?.title}`} />
          <meta key={"description"} name={"description"} content={post?.description} />
        </Head>
      )}
      {post && isPreview && (
        <>
          <PreviewAlert title={post?.title} />
          <PrismicToolbar repositoryName={repoName} />
        </>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ marginTop: "3rem" }}>
            {isFallback ? <>Loading...</> : post && <PostWithContent {...post} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;
export { getStaticProps, getStaticPaths };
