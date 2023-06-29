import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPostPreview } from "../../../server";
import type { PostPreviewModel } from "../../../post/model";

const previewStart = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const documentId = searchParams.get("documentId");

  if (!documentId || !token) {
    return new Response("Invalid request", { status: 401 });
  }

  const post: PostPreviewModel | null = await getPostPreview(token, documentId);

  if (!post) {
    return new Response("Invalid request", { status: 401 });
  }

  draftMode().enable();

  redirect("/preview/" + encodeURI(`${post.slug}?token=${token}&documentId=${documentId}`));
};

export { previewStart as GET };
