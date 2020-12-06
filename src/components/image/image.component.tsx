import React from "react";
import styles from "./image.module.scss";
import NextImage from "next/image";

const Image: React.FC<{
  src: string;
  alt?: string | null;
  size: number;
}> = (props) => {
  return (
    <>
      <div className={styles.image}>
        <NextImage src={props.src} alt={props.alt ?? ""} height={320} width={"auto"} />
      </div>
      {props.alt && <p className={styles.label}>{props.alt}</p>}
    </>
  );
};

export { Image };
