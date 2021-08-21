import type { FC } from "react";
import React from "react";
import styles from "./preview-alert.module.scss";
import Link from "next/link";

const PreviewAlert: FC<{ title: string }> = ({ title }) => (
  <div className={styles.root}>
    <h5>Режим предпросмотра записи: {`"${title}"`}</h5>
    <Link href={"/api/exit-preview"}>
      <a className={styles.close} title={"Выйти"}>
        X
      </a>
    </Link>
  </div>
);

export { PreviewAlert };
