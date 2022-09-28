import type { LinkResolverFunction } from "@prismicio/helpers";

const linkResolver: LinkResolverFunction = (doc) => {
  if (doc.type === "post") {
    return `/${doc.slug}`;
  }

  return "/";
};

export { linkResolver };
