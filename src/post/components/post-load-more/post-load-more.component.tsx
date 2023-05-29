"use client";

import type { FC } from "react";
import { useCallback, useMemo, useState, useTransition } from "react";
import { PostCard } from "../card";
import type { PostPreviewModel } from "../../model";
import { getPosts } from "../../../server";
import styles from "./post-load-more.module.scss";
import classNames from "classnames";

type Props = {
  title: string;
  startPage: number;
  limit: number;
  className?: string;
};

const PostLoadMore: FC<Props> = ({ title, startPage, limit, className }) => {
  const [offsetPage, setOffsetPage] = useState(startPage);
  const [posts, setPosts] = useState<PostPreviewModel[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isEnd, setIsEnd] = useState(false);

  const renderPosts = useMemo(
    () =>
      posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          priorityImage
          image={post.image}
          title={post.title}
          date={post.date}
          description={post.description}
        />
      )),
    [posts],
  );

  const addPosts = useCallback((posts: PostPreviewModel[]) => {
    if (!posts.length) {
      setIsEnd(true);
    }

    setPosts((items) => [...items, ...posts]);
    setOffsetPage((offset) => offset + 1);
  }, []);

  return (
    <>
      {renderPosts}
      {!isEnd && (
        <button
          className={classNames(styles.button, className)}
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              // @ts-ignore
              getPosts(limit, offsetPage).then(addPosts);
            })
          }
        >
          {title}
        </button>
      )}
    </>
  );
};

export { PostLoadMore };
