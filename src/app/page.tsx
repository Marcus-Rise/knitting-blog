import { PostCard } from "../post/components/card/post-card.component";
import { Container } from "../components/container";
import type { IPostService } from "../server";
import { bindDependencies, POST_SERVICE } from "../server";

const getPosts = bindDependencies(
  (postService: IPostService) => postService.getAll(),
  [POST_SERVICE],
);

const Home = async () => {
  const [firstPost, ...posts] = await getPosts();

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
