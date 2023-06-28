import { Container } from "../../components/container";
import { PostWithContent } from "../../post/components/with-content";
import { getPost, getPostPreview } from "../../server";
import type { Metadata, ResolvingMetadata } from "next";
import { config } from "../../config";
import { draftMode } from "next/headers";
import type { PostWithContentModel } from "../../post/model";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.scss";
import type { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

type Params = {
  slug: string;
};

type Props = { params: Params; searchParams: { token: string; documentId: string } };

const Post = async ({ params, searchParams }: Props) => {
  const { isEnabled } = draftMode();
  let post: PostWithContentModel | null;

  if (!isEnabled) {
    const { token, documentId } = searchParams;

    if (token && documentId) {
      redirect(`/api/preview?token=${token}&documentId=${documentId}`);
    }

    post = await getPost(params.slug);
  } else {
    const { token, documentId } = searchParams;

    if (!token || !documentId) {
      redirect("/404");
    }

    post = await getPostPreview(token, documentId);
  }

  const preview = isEnabled && (
    <div className={styles.preview}>
      Предпросмотр,{" "}
      <Link href={"/"} prefetch={false}>
        выйти
      </Link>
    </div>
  );

  if (!post) {
    return notFound();
  }

  return (
    <Container>
      {preview}
      <PostWithContent {...post} />
    </Container>
  );
};

const generateMetadata = async (
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { isEnabled } = draftMode();
  let post: PostWithContentModel | null;

  if (!isEnabled) {
    post = await getPost(params.slug);
  } else {
    const { token, documentId } = searchParams;

    if (!token || !documentId) {
      return {};
    }

    post = await getPostPreview(token, documentId);
  }

  if (!post) {
    return {};
  }

  const title = `${config.title} | ${post?.title}`;
  const description = post?.description;
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
export { generateMetadata };
