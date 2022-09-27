import type { GetStaticProps, NextPage } from "next";
import type { PostPreviewModel } from "../post/model";
import { useMemo } from "react";
import { PostCard } from "../post/components/card/post-card.component";
import { Container } from "../components/container";
import { PostService } from "../post/post.service";
import Head from "next/head";
import { config } from "../config";

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

  return (
    <Container>
      <Head>
        <title key={"title"}>{config.title}</title>
        <meta key={"meta-title"} name={"title"} content={config.title} />
        <meta key={"description"} name={"description"} content={description} />
        <meta property="og:image" content={firstPost.image.src} />
      </Head>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "3rem 0" }}>
        <PostCard
          key={firstPost.slug}
          title={firstPost.title}
          description={firstPost.description}
          image={firstPost.image}
          slug={firstPost.slug}
          date={firstPost.date}
        />
        {cards}
      </div>
    </Container>
  );
};

const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await PostService.getList();

  return {
    props: {
      posts,
    },
    revalidate: true,
  };
};

export default Home;
export { getStaticProps };
