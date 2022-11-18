import type { FC } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import { Theme } from "../theme";

const Footer: FC<{ authorName: string; authorLink: string; year: string }> = ({
  authorName,
  authorLink,
  year,
}) => {
  return (
    <footer className={styles.footer}>
      <Theme className={styles.theme} />
      <span>&#9400; {year}</span>
      <Link className={styles.link} href={authorLink} target={"_blank"} rel="noreferrer">
        {authorName}
      </Link>
    </footer>
  );
};

export { Footer };
