import { Container } from "../../components/container";
import { PostWithContent } from "../../post/components/with-content";
import { getPost, getPosts, getPreview } from "../../server";
import { previewData } from "next/headers";
import type { PostWithContentModel } from "../../post/model";

type Params = {
  slug: string;
};

const generateStaticParams = async () => {
  const posts = await getPosts();

  return posts.map<Params>((post) => ({ slug: post.slug }));
};

const Post = async ({ params }: { params: Params }) => {
  const preview = previewData();
  let post: PostWithContentModel | null;

  if (!preview) {
    post = await getPost(params.slug);
  } else {
    post = await getPreview(preview);
  }

  if (!post) {
    return null;
  }

  return (
    <Container>
      <PostWithContent {...post} />
    </Container>
  );
};

export default Post;
export { generateStaticParams };
