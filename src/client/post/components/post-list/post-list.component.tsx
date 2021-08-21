import type { FC } from "react";
import React from "react";
import { PostListItem } from "../post-list-item";
import type { IPost } from "../../../../common/post";
import styled from "styled-components";

interface IProps {
  items: Array<IPost>;
}

const Item = styled.div`
  margin-bottom: 1rem;
`;

const PostList: FC<IProps> = ({ items }) => {
  const posts = items.map((i, index) => {
    return (
      <div className="col-12" key={index}>
        <Item as={PostListItem} {...i} />
      </div>
    );
  });

  return <div className="row">{posts}</div>;
};

export { PostList };
