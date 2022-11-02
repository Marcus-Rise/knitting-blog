import { Container } from "../../components/container";
import { PostWithContent } from "../../post/components/with-content";
import type { IPostService } from "../../server";
import { inject, POST_SERVICE } from "../../server";

type Params = {
  slug: string;
};

const generateStaticParams = () =>
  inject(
    (postService: IPostService) =>
      postService.getAll().then((posts) => posts.map<Params>((post) => ({ slug: post.slug }))),
    [POST_SERVICE],
  );

const getPost = (uuid: string) =>
  inject((postService: IPostService) => postService.getByUUID(uuid), [POST_SERVICE]);

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
