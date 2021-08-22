import type { FC } from "react";
import React from "react";
import styled from "styled-components";
import { colors } from "../../styles";

interface IProps {
  items: string[];
}

const Li = styled.li`
  line-height: 1.75rem;
  letter-spacing: 0.2em;

  &::marker {
    color: ${colors.accent};
    font-size: 1.3rem;
  }
`;

const Ul: FC<IProps> = (props) => {
  const items = props.items.map((i, index) => <Li key={index}>{i}</Li>);

  return <ul>{items}</ul>;
};

export { Ul };
