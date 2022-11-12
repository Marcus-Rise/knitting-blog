import { Container } from "../../components/container";
import { PostWithContent } from "../../post/components/with-content";
import { getPost, getPosts } from "../../server";

type Params = {
  slug: string;
};

const generateStaticParams = async () => {
  const posts = await getPosts();

  return posts.map<Params>((post) => ({ slug: post.slug }));
};

const Post = async ({ params }: { params: Params }) => {
  const uuid = params.slug;
  const post = await getPost(uuid);

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
