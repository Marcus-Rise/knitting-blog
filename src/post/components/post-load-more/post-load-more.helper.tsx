"use server";

import { getPosts } from "../../../server";
import { PostCard } from "../card";

const loadPosts = async (limit: number, offset: number) => {
  const posts = await getPosts(limit, offset);

  return posts.map((post) => (
    <PostCard
      key={post.slug}
      slug={post.slug}
      priorityImage
      image={post.image}
      title={post.title}
      date={post.date}
      description={post.description}
    />
  ));
};

export default loadPosts;
