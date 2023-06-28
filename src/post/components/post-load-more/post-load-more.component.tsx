"use client";

import type { FC, ReactNode } from "react";
import { useCallback, useState, useTransition } from "react";
import styles from "./post-load-more.module.scss";
import classNames from "classnames";
import loadPosts from "./post-load-more.helper";

type Props = {
  title: string;
  startPage: number;
  limit: number;
  className?: string;
};

const PostLoadMore: FC<Props> = ({ title, startPage, limit, className }) => {
  const [offsetPage, setOffsetPage] = useState(startPage);
  const [posts, setPosts] = useState<Array<ReactNode>>([]);
  const [isPending, startTransition] = useTransition();
  const [isEnd, setIsEnd] = useState(false);

  const addPosts = useCallback((posts: Array<ReactNode>) => {
    if (!posts.length) {
      setIsEnd(true);
    }

    setPosts((items) => [...items, ...posts]);
    setOffsetPage((offset) => offset + 1);
  }, []);

  return (
    <>
      {posts}
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
