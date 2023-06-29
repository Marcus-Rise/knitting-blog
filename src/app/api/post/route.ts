import { getPosts } from "../../../server";
import { NextResponse } from "next/server";
import type { PostPreviewModel } from "../../../post/model";

const getPostCollection = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 0);

  const posts: Array<PostPreviewModel> = await getPosts(limit, page);

  return NextResponse.json(posts);
};

export { getPostCollection as GET };
