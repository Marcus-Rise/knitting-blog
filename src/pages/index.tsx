import type { GetStaticProps, NextPage } from "next";
import type { PostPreviewModel } from "../post/model";
import { useEffect, useMemo } from "react";
import { PostCard } from "../post/components/card/post-card.component";
import { Container } from "../components/container";
import { PostService } from "../post/post.service";
import Head from "next/head";
import { config } from "../config";

const sendNotification = async () => {
  const permission = await Notification.requestPermission();

  console.debug("permission: ", permission);

  if (permission === "granted") {
    setInterval(() => {
      console.debug("notify");
      new Notification("Test notification");
    }, 2000);
  }
};

type Props = {
  posts: Array<PostPreviewModel>;
};

const Home: NextPage<Props> = ({ posts: [firstPost, ...posts] }) => {
  const cards = useMemo(
    () =>
      posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          description={post.description}
          image={post.image}
          slug={post.slug}
          date={post.date}
        />
      )),
    [posts],
  );

  const description = useMemo(
    () => [firstPost, ...posts].map((i) => i.title.toLowerCase()).join(", "),
    [firstPost, posts],
  );

  useEffect(() => {
    sendNotification();
  }, []);

  return (
    <Container>
      <Head>
        <title key={"title"}>{config.title}</title>
        <meta key={"meta-title"} name={"title"} content={config.title} />
        <meta key={"description"} name={"description"} content={description} />
        <meta property="og:image" content={firstPost.image.src} />
      </Head>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <PostCard
          key={firstPost.slug}
          slug={firstPost.slug}
          priorityImage
          image={firstPost.image}
          title={firstPost.title}
          date={firstPost.date}
          description={firstPost.description}
        />
        {cards}
      </div>
    </Container>
  );
};

const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await PostService.list();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
export { getStaticProps };
