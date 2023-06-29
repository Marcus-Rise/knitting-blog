import type { PostPreviewModel } from "../../model";

const loadPosts = async (limit: number, page: number): Promise<Array<PostPreviewModel>> => {
  const response = await fetch(`/api/post?limit=${limit}&page=${page}`);

  return await response.json();
};

export default loadPosts;
