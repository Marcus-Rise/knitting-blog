import { Container } from "../../components/container";
import { PostWithContent } from "../../post/components/with-content";
import { getPost, getPosts } from "../../server";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "../../config";
import { notFound } from "next/navigation";
import type { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

type Params = {
  slug: string;
};

type Props = { params: Params };

const Post = async ({ params }: Props) => {
  const post = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <Container>
      <PostWithContent {...post} />
    </Container>
  );
};

const generateStaticParams = async (): Promise<Array<Params>> => {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  const title = `${config.title} | ${post.title}`;
  const description = post.description;
  const images = [{ url: new URL(post.image.src), alt: title }];
  const canonicalUrl = new URL("/" + post.slug, config.baseUrl);
  const previousAlternateTypes: AlternateURLs["types"] =
    (await parent).alternates?.types ?? undefined;

  return {
    title,
    description,
    keywords: [...config.title.split(" "), ...post.slug.split("-")],
    twitter: {
      title,
      description,
      images,
      card: "summary_large_image",
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date.toISOString(),
      images,
      url: canonicalUrl,
    },
    alternates: {
      types: previousAlternateTypes,
      canonical: canonicalUrl,
    },
  };
};

export default Post;
export { generateMetadata, generateStaticParams };
