import { PostCard } from "../post/components/card";
import { Container } from "../components/container";
import { getPosts } from "../server";
import React, { Suspense } from "react";

const Home = async () => {
  const [firstPost, ...posts] = await getPosts();

  const cards = posts.map((post) => (
    <Suspense key={post.slug}>
      <PostCard
        title={post.title}
        description={post.description}
        image={post.image}
        slug={post.slug}
        date={post.date}
      />
    </Suspense>
  ));

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Suspense>
          <PostCard
            key={firstPost.slug}
            slug={firstPost.slug}
            priorityImage
            image={firstPost.image}
            title={firstPost.title}
            date={firstPost.date}
            description={firstPost.description}
          />
        </Suspense>
        {cards}
      </div>
    </Container>
  );
};

export default Home;
