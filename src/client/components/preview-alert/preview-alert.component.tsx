import React from "react";
import styles from "./preview-alert.module.scss";
import Link from "next/link";

const PreviewAlert: React.FC<{ title: string }> = (props) => {
  return (
    <div className={styles.root}>
      <h5>Режим предпросмотра записи: {`"${props.title}"`}</h5>
      <Link href={"/api/exit-preview"}>
        <a className={styles.close} title={"Выйти"}>
          X
        </a>
      </Link>
    </div>
  );
};

export { PreviewAlert };
