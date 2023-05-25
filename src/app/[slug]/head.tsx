import { config } from "../../config";
import { getPost, getPreview } from "../../server";
import type { PostWithContentModel } from "../../post/model";
import { previewData } from "next/headers";

type Params = {
  slug: string;
};

const Head = async ({ params }: { params: Params }) => {
  const preview = previewData();
  let post: PostWithContentModel | null = null;

  if (!preview) {
    post = await getPost(params.slug);
  } else {
    post = await getPreview(preview);
  }

  if (!post) {
    return null;
  }

  const title = `${config.title} | ${post.title}`;

  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="color-scheme" content="dark light" />
      <meta name="theme-color" content={"#fff"} />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <title key={"title"}>{title}</title>
      <meta key={"meta-title"} name={"title"} content={title} />
      <meta key={"description"} name={"description"} content={post.description} />
      <meta property="og:image" content={post.image.src} />
    </>
  );
};

export default Head;
