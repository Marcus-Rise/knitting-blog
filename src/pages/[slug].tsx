import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { config } from "../config";
import Head from "next/head";
import { useMemo } from "react";
import type { PostWithContentModel } from "../post/model";
import { PostService } from "../post/post.service";
import { Container } from "../components/container";
import { PostWithContent } from "../post/components/with-content";

type Props = {
  post?: PostWithContentModel;
};

const Post: NextPage<Props> = ({ post }) => {
  const title = useMemo(() => `${config.title} | ${post?.title}`, [post?.title]);

  if (!post) {
    return null;
  }

  return (
    <>
      <Head>
        <title key={"title"}>{title}</title>
        <meta key={"meta-title"} name={"title"} content={title} />
        <meta key={"description"} name={"description"} content={post.description} />
        <meta property="og:image" content={post.image.src} />
      </Head>
      <Container>
        <PostWithContent {...post} />
      </Container>
    </>
  );
};

const getStaticProps: GetStaticProps<Props> = async (context) => {
  const uuid = String(context.params?.slug);
  const post = await PostService.find(uuid, context.previewData);

  return {
    props: {
      post,
    },
    revalidate: true,
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const posts = await PostService.list();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};

export default Post;
export { getStaticProps, getStaticPaths };
