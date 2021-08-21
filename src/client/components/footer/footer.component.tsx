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

const Footer: FC<IProps> = ({ author, authorLink, year }) => (
  <Root>
    <span className="mr-1">&#9400; {year}</span>
    <a href={authorLink} target={"_blank"} rel="noreferrer">
      {author}
    </a>
  </Root>
);

export { Footer };
