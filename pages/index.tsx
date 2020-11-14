import React, { useEffect } from "react";
import type { GetStaticProps } from "next";
import { PostList } from "../src/post/post-list";
import type { IPost, IPostService } from "../src/post";
import { POST_SERVICE_PROVIDER } from "../src/post";
import { inject, useInject } from "../src/ioc";

interface IProps {
  posts: Array<IPost>;
}

const getStaticProps: GetStaticProps<IProps> = async () => {
  const postService = inject<IPostService>(POST_SERVICE_PROVIDER);

  return {
    props: {
      posts: await postService.getList(5, 0),
    },
  };
};

const Home: React.FC<IProps> = (props) => {
  const postService = useInject<IPostService>(POST_SERVICE_PROVIDER);

  useEffect(() => {
    console.debug(props.posts);

    postService.getList(10, 0).then(console.debug);
  }, [props.posts, postService]);

  return (
    <div className="container">
      <PostList items={props.posts} />
    </div>
  );
};

export { getStaticProps };
export default Home;
