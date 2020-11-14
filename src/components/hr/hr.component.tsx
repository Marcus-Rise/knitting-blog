import type { CSSProperties } from "react";
import React from "react";
import styles from "./hr.module.scss";

interface IProps {
  styles?: CSSProperties;
}

const Hr: React.FC<IProps> = (props) => <hr className={styles.hr} style={props.styles} />;

export { Hr };
