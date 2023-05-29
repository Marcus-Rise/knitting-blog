import { PostCard } from "../post/components/card";
import { Container } from "../components/container";
import { getPosts } from "../server";

const MAIN_PAGE_POST_LIMIT = 10;

const Home = async () => {
  const [firstPost, ...posts] = await getPosts(MAIN_PAGE_POST_LIMIT);

  const cards = posts.map((post) => (
    <PostCard
      key={post.slug}
      title={post.title}
      description={post.description}
      image={post.image}
      slug={post.slug}
      date={post.date}
    />
  ));

  return (
    <Container>
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

export default Home;
