import React from "react";
import type { IPost } from "../post.interface";
import styles from "./post-with-content.module.scss";
import { Hr } from "../../components/hr";
import Image from "next/image";
import { Ul } from "../../components/ul";

type IProps = IPost;

const PostWithContent: React.FC<IProps> = (props) => {
  const images = new Array(4)
    .fill(<Image src={props.imageSrc} alt={props.imageLabel} height={320} width={"auto"} />)
    .map((i, index) => (
      <div className="col-auto" key={index}>
        {i}
      </div>
    ));

  return (
    <>
      <h2 className={styles.title}>{props.title}</h2>
      <Hr />
      <p className={styles.meta}>{props.date}</p>
      <Image src={props.imageSrc} alt={props.imageLabel} height={320} width={"auto"} layout={"responsive"} />
      <p className={styles.description}>{props.description}</p>
      <Ul items={["BO – Bind off", "k2tog – knit two stitches together decrease", "p – purl", "YO – yarn over"]} />
      <p className={styles.description}>{props.description}</p>
      <div className="row justify-content-center">{images}</div>
      <Hr styles={{ marginTop: "3rem", marginBottom: "3rem" }} />
      <p className={styles.description}>{props.description}</p>
      <p className={styles.footer}>{props.date}</p>
    </>
  );
};

export { PostWithContent };
