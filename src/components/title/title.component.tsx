import type { FC, HTMLAttributes } from "react";
import styles from "./title.module.scss";
import classnames from "classnames";

const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 {...props} className={classnames(styles.title, className)} />
);

export { Title };
