import React from "react";
import styles from "./ul.module.scss";

interface IProps {
  items: string[];
}

const Ul: React.FC<IProps> = (props) => {
  const items = props.items.map((i, index) => (
    <li className={styles.li} key={index}>
      {i}
    </li>
  ));

  return <ul>{items}</ul>;
};

export { Ul };
