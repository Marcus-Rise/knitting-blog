import { Container } from "../../components/container";
import { PostWithContent } from "../../post/components/with-content";
import { getPost, getPosts } from "../../server";
import type { Metadata } from "next";
import { config } from "../../config";

type Params = {
  slug: string;
};

type Props = { params: Params };

const Post = async ({ params }: Props) => {
  const post = await getPost(params.slug);

  if (!post) {
    return null;
  }

  return (
    <Container>
      <PostWithContent {...post} />
    </Container>
  );
};

const generateStaticParams = async () => {
  const posts = await getPosts();

  return posts.map<Params>((post) => ({ slug: post.slug }));
};

const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  const title = `${config.title} | ${post?.title}`;
  const description = post?.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
};

export default Post;
export { generateStaticParams, generateMetadata };
