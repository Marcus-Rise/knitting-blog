import type { FC } from "react";
import React from "react";
import styled from "styled-components";

interface IProps {
  year: string | number;
  author: string;
  authorLink: string;
}

const Root = styled.footer`
  background-color: #dbdbdb;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 1rem;
`;

const Link = styled.a`
  margin-left: 0.25rem;
`;

const Footer: FC<IProps> = ({ author, authorLink, year }) => (
  <Root>
    <span>&#9400; {year}</span>
    <Link href={authorLink} target={"_blank"} rel="noreferrer">
      {author}
    </Link>
  </Root>
);

export { Footer };
