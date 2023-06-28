import { getPostSlug } from "../../../server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;
const REPOSITORY_NAME = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY;

type PrismicHookPayload = {
  secret: string;
  domain: string;
  documents: Array<string>;
};

const Revalidate = async (req: Request) => {
  const body: PrismicHookPayload = await req.json();

  if (!body) {
    return NextResponse.json({ message: "Body must be provided" }, { status: 400 });
  }

  if (body.secret !== REVALIDATE_TOKEN || body.domain !== REPOSITORY_NAME) {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }

  const postId = body.documents.at(0);

  if (!postId) {
    return NextResponse.json({ message: "No document was found" }, { status: 404 });
  }

  const postSlug = await getPostSlug(postId);

  if (!postSlug) {
    return NextResponse.json({ message: "No document slug was found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath(`/${postSlug}`);
  revalidatePath(`/sitemap.xml`);

  return NextResponse.json({ revalidated: true });
};

export { Revalidate as POST };
