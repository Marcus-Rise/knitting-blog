import type { Document } from "prismic-javascript/types/documents";

const LinkResolver = (doc: Document): string => {
  let res: string;

  if (doc.type === "post") {
    res = "/[slug]";
  } else {
    res = "/";
  }

  return res;
};

export { LinkResolver };
