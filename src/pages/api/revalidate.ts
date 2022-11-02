import type { NextApiHandler } from "next";
import type { IPostService } from "../../server";
import { inject, POST_SERVICE } from "../../server";

const getPostSlug = (id: string) =>
  inject((postService: IPostService) => postService.getSlugByID(id), [POST_SERVICE]);

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;
const REPOSITORY_NAME = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY;

type PrismicHookPayload = {
  secret: string;
  domain: string;
  documents: Array<string>;
};

const Revalidate: NextApiHandler = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Body must be provided" });
  }

  const payload: PrismicHookPayload = req.body;

  if (payload.secret !== REVALIDATE_TOKEN || payload.domain !== REPOSITORY_NAME) {
    return res.status(401).json({ message: "Access denied" });
  }

  const postId = payload.documents.at(0);

  if (!postId) {
    return res.status(404).json({ message: "No document was found" });
  }

  const postSlug = await getPostSlug(postId);

  if (!postSlug) {
    return res.status(404).json({ message: "No document slug was found" });
  }

  return Promise.all([res.revalidate("/"), res.revalidate(`/${postSlug}`)])
    .then(() => res.json({ revalidated: true }))
    .catch((err) => res.status(500).send(err));
};

export default Revalidate;
