import type { FC } from "react";
import React from "react";
import styles from "./footer.module.scss";

interface IProps {
  year: string | number;
  author: string;
  authorLink: string;
}

const Footer: FC<IProps> = ({ author, authorLink, year }) => (
  <footer className={styles.footer}>
    <span className="mr-1">&#9400; {year}</span>
    <a href={authorLink} target={"_blank"} rel="noreferrer">
      {author}
    </a>
  </footer>
);

export { Footer };
