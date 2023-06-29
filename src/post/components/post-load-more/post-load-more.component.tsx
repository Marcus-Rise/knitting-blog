"use client";

import type { FC } from "react";
import { useCallback, useMemo, useState, useTransition } from "react";
import styles from "./post-load-more.module.scss";
import classNames from "classnames";
import loadPosts from "./post-load-more.helper";
import type { PostPreviewModel } from "../../model";
import { PostCard } from "../card";

type Props = {
  title: string;
  startPage: number;
  limit: number;
  className?: string;
};

const PostLoadMore: FC<Props> = ({ title, startPage, limit, className }) => {
  const [offsetPage, setOffsetPage] = useState(startPage);
  const [posts, setPosts] = useState<Array<PostPreviewModel>>([]);
  const [isPending, startTransition] = useTransition();
  const [isEnd, setIsEnd] = useState(false);

  const addPosts = useCallback((posts: Array<PostPreviewModel>) => {
    if (!posts.length) {
      setIsEnd(true);
    }

    setPosts((items) => [...items, ...posts]);
    setOffsetPage((offset) => offset + 1);
  }, []);

  const items = useMemo(
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
    <>
      {items}
      {!isEnd && (
        <button
          className={classNames(styles.button, className)}
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              loadPosts(limit, offsetPage).then(addPosts);
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
