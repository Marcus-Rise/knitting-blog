import { PostCard } from "../post/components/card";
import { Container } from "../components/container";
import { getPosts } from "../server";
import styles from "./page.module.scss";
import type { Metadata } from "next";
import { config } from "../config";
import { PostLoadMore } from "../post/components/post-load-more";

const POST_LAZY_LOAD_LIMIT = 10;
const POST_LAZY_LOAD_START_PAGE = 2;

const Home = async () => {
  const posts = await getPosts(POST_LAZY_LOAD_LIMIT);

  const cards = posts.map((post, index) => (
    <PostCard
      key={post.slug}
      priorityImage={index === 0}
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
        {cards}
        {posts.length === POST_LAZY_LOAD_LIMIT && (
          <PostLoadMore
            title={"Читать больше"}
            startPage={POST_LAZY_LOAD_START_PAGE}
            limit={POST_LAZY_LOAD_LIMIT}
            className={styles.postLoadMoreButton}
          />
        )}
      </div>
    </Container>
  );
};

const generateMetadata = async (): Promise<Metadata> => {
  const [firstPost] = await getPosts(POST_LAZY_LOAD_LIMIT);
  const title = config.title;
  const description = config.description;
  const images = [{ url: new URL(firstPost.image.src), alt: firstPost.title }];

  return {
    title,
    description,
    keywords: [...title.split(" "), ...firstPost.slug.split("-")],
    twitter: {
      title,
      description,
      images,
      card: "summary_large_image",
    },
    openGraph: {
      title,
      description,
      images,
      url: new URL("/", config.baseUrl),
    },
  };
};

export default Home;
export { generateMetadata };
