import React from "react";
import type { GetStaticProps } from "next";
import { PostList } from "../src/post/post-list";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import { inject } from "../src/ioc";

interface IProps {
  posts: Array<IPost>;
}

const getStaticProps: GetStaticProps<IProps> = async () => {
  const postService = inject<IPostService>(POST_SERVICE_PROVIDER);

  return {
    props: {
      posts: await postService.getList(0, 5),
    },
  };
};

const Home: React.FC<IProps> = (props) => {
  return (
    <div className="container">
      <PostList items={props.posts} />
    </div>
  );
};

export { getStaticProps };
export default Home;
