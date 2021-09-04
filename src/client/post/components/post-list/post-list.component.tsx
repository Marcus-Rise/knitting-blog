import type { FC } from "react";
import React from "react";
import { PostListItem } from "../post-list-item";
import styled from "styled-components";
import { Container } from "../../../components";
import type { IPostList } from "../../../../common/post";

interface IProps {
  items: IPostList;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  margin-bottom: 1rem;
`;

const PostList: FC<IProps> = ({ items }) => {
  const posts = items.map((i, index) => (
    <Item as={PostListItem} {...i} key={i.slug} priority={index === 0} />
  ));

  return <List as={Container}>{posts}</List>;
};

export { PostList };
