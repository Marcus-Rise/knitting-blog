import type { FC } from "react";
import React from "react";
import { PostListItem } from "../post-list-item";
import styles from "./post-list.module.scss";
import type { IPost } from "../../../../common/post";

interface IProps {
  items: Array<IPost>;
}

const PostList: FC<IProps> = ({ items }) => {
  const posts = items.map((i, index) => {
    return (
      <div className="col-12" key={index}>
        <PostListItem className={styles.item} {...i} />
      </div>
    );
  });

  return <div className="row">{posts}</div>;
};

export { PostList };
