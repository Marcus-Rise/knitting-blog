import type { FC } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";

const Footer: FC<{ authorName: string; authorLink: string; year: string }> = ({
  authorName,
  authorLink,
  year,
}) => {
  return (
    <footer className={styles.footer}>
      <span>&#9400; {year}</span>
      <Link href={authorLink} target={"_blank"} rel="noreferrer">
        {authorName}
      </Link>
    </footer>
  );
};

export { Footer };
