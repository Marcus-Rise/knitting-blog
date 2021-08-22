import type { FC } from "react";
import React from "react";
import { PostListItem } from "../post-list-item";
import type { IPost } from "../../../../common/post";
import styled from "styled-components";
import { Container } from "../../../components";

interface IProps {
  items: Array<IPost>;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  margin-bottom: 1rem;
`;

const PostList: FC<IProps> = ({ items }) => {
  const posts = items.map((i) => <Item as={PostListItem} {...i} key={i.slug} />);

  return <List as={Container}>{posts}</List>;
};

export { PostList };
