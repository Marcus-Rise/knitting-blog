import { config } from "../../config";
import type { IPostService } from "../../server";
import { bindDependencies, POST_SERVICE } from "../../server";

const getPost = (uuid: string) =>
  bindDependencies((postService: IPostService) => postService.getByUUID(uuid), [POST_SERVICE])();

const Head = async ({ uuid }: { uuid: string }) => {
  const post = await getPost(uuid);

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
