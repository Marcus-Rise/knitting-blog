import { config } from "../../config";
import { getPost } from "../../server";

type Params = {
  slug: string;
};

const Head = async ({ params }: { params: Params }) => {
  const post = await getPost(params.slug);

  if (!post) {
    return null;
  }

  const title = `${config.title} | ${post.title}`;

  return (
    <>
      <title key={"title"}>{title}</title>
      <meta key={"meta-title"} name={"title"} content={title} />
      <meta key={"description"} name={"description"} content={post.description} />
      <meta property="og:image" content={post.image.src} />
    </>
  );
};

export default Head;
