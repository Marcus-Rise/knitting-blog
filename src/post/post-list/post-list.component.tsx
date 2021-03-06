import React from "react";
import type { IPost } from "../post.interface";
import { PostListItem } from "../post-list-item";
import styles from "./post-list.module.scss";

interface IProps {
  items: Array<IPost>;
}

const PostList: React.FC<IProps> = (props) => {
  const posts = props.items.map((i, index) => {
    return (
      <div className="col-12" key={index}>
        <PostListItem className={styles.item} {...i} />
      </div>
    );
  });

  return <div className="row">{posts}</div>;
};

export { PostList };
