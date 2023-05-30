import { PostCard } from "../post/components/card";
import { Container } from "../components/container";
import { getPosts } from "../server";
import { PostLoadMore } from "../post/components/post-load-more";
import styles from "./page.module.scss";
import type { Metadata } from "next";
import { config } from "../config";
import { draftMode } from "next/headers";

const POST_LAZY_LOAD_LIMIT = 10;
const POST_LAZY_LOAD_START_PAGE = 2;

const Home = async () => {
  if (draftMode().isEnabled) {
    draftMode().disable();
  }

  const [firstPost, ...posts] = await getPosts(POST_LAZY_LOAD_LIMIT);

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
      <div className={styles.postContainer}>
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
        <PostLoadMore
          title={"Смотреть больше"}
          startPage={POST_LAZY_LOAD_START_PAGE}
          limit={POST_LAZY_LOAD_LIMIT}
          className={styles.postLoadMoreButton}
        />
      </div>
    </Container>
  );
};

const generateMetadata = async (): Promise<Metadata> => {
  const [post] = await getPosts(POST_LAZY_LOAD_LIMIT);

  return {
    title: config.title,
    description: post.description,
    keywords: [...config.title.split(" "), ...post.slug.split("-")],
    openGraph: {
      title: config.title,
      description: config.title,
      images: [{ url: new URL(post.image.src), alt: post.title }],
    },
  };
};

export default Home;
export { generateMetadata };
