import type { FC } from "react";
import React from "react";
import styles from "./ul.module.scss";

interface IProps {
  items: string[];
}

const Ul: FC<IProps> = (props) => {
  const items = props.items.map((i, index) => (
    <li className={styles.li} key={index}>
      {i}
    </li>
  ));

  return <ul>{items}</ul>;
};

export { Ul };
