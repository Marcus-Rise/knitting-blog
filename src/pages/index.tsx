import type { GetStaticProps, NextPage } from "next";
import type { PostPreviewModel } from "../post/model";
import { useMemo } from "react";
import { PostCard } from "../post/components/card/post-card.component";
import { Container } from "../components/container";
import { PostService } from "../post/post.service";

type Props = {
  posts: Array<PostPreviewModel>;
};

const Home: NextPage<Props> = ({ posts }) => {
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

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "3rem 0" }}>
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
