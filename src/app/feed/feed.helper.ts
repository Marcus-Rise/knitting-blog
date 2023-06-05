import type { PostWithContentModel } from "../../post/model";
import { asHTML } from "@prismicio/helpers";
import { postImageLoader } from "../../post/components/post-image";
import { getPost, getPosts } from "../../server";
import { config } from "../../config";
import { Feed } from "feed";
import Logo from "../icon.png";

const generatePostHtmlContent = (post: PostWithContentModel): string =>
  post.content
    .map((node) => {
      switch (node.slice_type) {
        case "text": {
          return asHTML(node.primary.text);
        }
        case "image_gallery": {
          const images = node.items
            .map(
              ({ gallery_image: { alt, dimensions, url } }) =>
                `<img src="${postImageLoader({
                  src: url ?? "",
                  width: dimensions?.width ?? 300,
                })}" alt="${alt}" width="${dimensions?.width}" height="${dimensions?.height}" />`,
            )
            .join("");

          return `<div data-block="gallery">${images}</div>`;
        }
      }
    })
    .join("");

const generateFeed = async (baseUrl: URL, feedUrl: string) => {
  const [firstPost, ...posts] = await getPosts(100);
  const title = config.title;
  const description = firstPost.description;

  const chanel = new Feed({
    title,
    description,
    id: baseUrl.href,
    link: baseUrl.href,
    language: "ru",
    image: new URL(Logo.src, baseUrl).href,
    favicon: new URL("/favicon.ico", baseUrl).href,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${config.author.name}`,
    updated: firstPost.date,
    author: config.author,
    feedLinks: {
      atom: feedUrl,
    },
  });

  for (const item of [firstPost, ...posts]) {
    const post = await getPost(item.slug);

    if (!post) {
      continue;
    }

    const title = `${config.title} | ${post?.title}`;
    const description = post.description;
    const content: string = generatePostHtmlContent(post);
    const postUrl = new URL("/" + post.slug, baseUrl).href;

    chanel.addItem({
      title,
      description,
      content,
      date: post.date,
      id: postUrl,
      link: postUrl,
      image: post.image.src,
    });
  }

  return chanel;
};

export { generateFeed };
