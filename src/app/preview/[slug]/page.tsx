import { Container } from "../../../components/container";
import { PostWithContent } from "../../../post/components/with-content";
import { getPostPreview } from "../../../server";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.scss";

type Params = {
  slug: string;
};

type Props = { params: Params; searchParams: { token: string; documentId: string } };

const Post = async ({ searchParams }: Props) => {
  const { isEnabled } = draftMode();
  const { token, documentId } = searchParams;

  if (!isEnabled || !token || !documentId) {
    return redirect("/404");
  }

  const post = await getPostPreview(token, documentId);

  const preview = isEnabled && (
    <div className={styles.preview}>
      Предпросмотр,{" "}
      <Link href={"/api/preview/exit"} prefetch={false}>
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

export default Post;
