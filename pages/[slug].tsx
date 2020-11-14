import React from "react";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import type { GetStaticPaths, GetStaticProps } from "next";
import { inject } from "../src/ioc";
import { PostListItem } from "../src/post/post-list-item";
import { useRouter } from "next/router";

interface IProps {
  post: IPost | null;
}

const getStaticPaths: GetStaticPaths = async () => {
  const postService = inject<IPostService>(POST_SERVICE_PROVIDER);
  const posts = await postService.getList(5, 0);

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
  };
};

const PostPage: React.FC<IProps> = (props) => {
  const { isFallback } = useRouter();

  return (
    <div className="container">{isFallback ? <>Loading...</> : props.post && <PostListItem {...props.post} />}</div>
  );
};

export default PostPage;
export { getStaticProps, getStaticPaths };
