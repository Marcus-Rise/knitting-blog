import type { CSSProperties, FC } from "react";
import React from "react";
import styles from "./hr.module.scss";

interface IProps {
  styles?: CSSProperties;
}

const Hr: FC<IProps> = (props) => <hr className={styles.hr} style={props.styles} />;

export { Hr };
