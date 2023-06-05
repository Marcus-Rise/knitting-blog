import RSS from "rss";
import type { NextRequest } from "next/server";
import { postImageLoader } from "../../post/components/post-image";
import { getPost, getPosts } from "../../server";
import { config } from "../../config";
import { asHTML } from "@prismicio/helpers";
import type { PostWithContentModel } from "../../post/model";
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

const generateRss = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const host = requestHeaders.get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);
  const feedUrl = new URL(req.url).pathname;

  const [firstPost, ...posts] = await getPosts(100);
  const title = config.title;
  const description = firstPost.description;

  const chanel = new RSS({
    title,
    description,
    pubDate: firstPost.date,
    site_url: baseUrl.href,
    feed_url: feedUrl,
    image_url: Logo.src,
  });

  for (const item of [firstPost, ...posts]) {
    const post = await getPost(item.slug);

    if (!post) {
      return;
    }

    const title = `${config.title} | ${post?.title}`;
    const description = post.description;
    // const content: string = generatePostHtmlContent(post);

    const postUrl = new URL("/" + post.slug, baseUrl).href;

    chanel.item({
      title,
      description,
      date: post.date,
      url: postUrl,
      guid: postUrl,
      // image_url: postImageLoader({ src: post.image.src, width: post.image.width }),
      // image_caption: post.image.alt || title,
      // content,
    });
  }

  const xml = chanel.xml();

  const headers = new Headers();

  // headers.set("Content-Type", "application/rss+xml");

  return new Response(xml, {
    headers,
  });
};

export { generateRss as GET };
