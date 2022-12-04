import { config } from "../config";
import { getPosts } from "../server";

const Head = async () => {
  const [firstPost, ...posts] = await getPosts();
  const description = [firstPost, ...posts].map((i) => i.title.toLowerCase()).join(", ");

  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="color-scheme" content="dark light" />
      <meta name="theme-color" content={"#fff"} />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <title key={"title"}>{config.title}</title>
      <meta key={"meta-title"} name={"title"} content={config.title} />
      <meta key={"description"} name={"description"} content={description} />
      <meta property="og:image" content={firstPost.image.src} />
    </>
  );
};

export default Head;
