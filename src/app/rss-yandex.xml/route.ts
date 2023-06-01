import YandexRssChanelGenerator from "yandex-turbo-rss";
import { getPost, getPosts } from "../../server";
import { config } from "../../config";
import type { NextRequest } from "next/server";
import { asHTML } from "@prismicio/helpers";

const generateRssYandexChanel = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const host = requestHeaders.get("Host") ?? "";
  const baseUrl = new URL(`https://${host}`);

  const [firstPost, ...posts] = await getPosts(100);
  const title = config.title;
  const description = firstPost.description;

  const chanel = new YandexRssChanelGenerator({ title, link: baseUrl.href, description });

  const tasks = [firstPost, ...posts].map(async ({ slug }) => {
    const post = await getPost(slug);

    if (!post) {
      return;
    }

    const title = `${config.title} | ${post?.title}`;
    const content: string = post.content
      .map((node) => {
        switch (node.slice_type) {
          case "text": {
            return asHTML(node.primary.text);
          }
          case "image_gallery": {
            const images = node.items
              .map(
                ({ gallery_image: { alt, dimensions, url } }) =>
                  `<img src="${url}" alt="${alt}" width="${dimensions?.width}" height="${dimensions?.height}" />`,
              )
              .join("");

            return `<div>${images}</div>`;
          }
        }
      })
      .join("");

    chanel.item({
      title,
      date: post.date.toISOString(),
      link: new URL("/" + post.slug, baseUrl).href,
      image_url: post.image.src,
      image_caption: post.image.alt,
      content,
    });
  });

  await Promise.all(tasks);

  const xml = chanel.xml();

  const headers = new Headers();

  headers.set("Content-Type", "application/rss+xml");

  return new Response(xml, {
    headers,
  });
};

export { generateRssYandexChanel as GET };
