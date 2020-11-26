import React from "react";
import type { IPostContent } from "../../post-content.inteface";
import Image from "next/image";
import { Elements } from "prismic-reactjs";
import styles from "./post-content.module.scss";
import { SliceTypeEnum } from "../../post-prismic.dto.interface";
import { ImageView } from "../../../components/image-view";

interface IProps {
  content: IPostContent;
}

const PostContent: React.FC<IProps> = (props) => {
  const slices = props.content.map((slice, sliceIndex) => {
    if (slice.type === SliceTypeEnum.IMAGE_GALLERY) {
      const images = slice.items.map((image, imageIndex, items) => (
        <div className="col-auto" key={image.url + imageIndex}>
          <ImageView album={items.map((i) => ({ src: i.url, alt: i.alt ?? "" }))} currentIndex={imageIndex}>
            <div className={styles.image}>
              <Image src={image.url} alt={image.alt ?? ""} height={320} width={"auto"} />
            </div>
            <p className={styles.imageLabel}>{image.alt}</p>
          </ImageView>
        </div>
      ));

      return (
        <div key={sliceIndex} className={`row justify-content-center ${styles.imageGallery}`}>
          {images}
        </div>
      );
    } else {
      switch (slice.type) {
        case Elements.heading1:
          return <h1 key={sliceIndex}>{slice.text}</h1>;
        case Elements.heading2:
          return <h2 key={sliceIndex}>{slice.text}</h2>;
        case Elements.heading3:
          return <h3 key={sliceIndex}>{slice.text}</h3>;
        case Elements.heading4:
          return <h4 key={sliceIndex}>{slice.text}</h4>;
        case Elements.heading5:
          return <h5 key={sliceIndex}>{slice.text}</h5>;
        case Elements.heading6:
          return <h6 key={sliceIndex}>{slice.text}</h6>;
        case Elements.paragraph:
          return <p key={sliceIndex}>{slice.text}</p>;
        case Elements.listItem:
          return <li key={sliceIndex}>{slice.text}</li>;
        case Elements.oListItem:
          return <li key={sliceIndex}>{slice.text}</li>;
        case Elements.em:
          return <em key={sliceIndex}>{slice.text}</em>;
        case Elements.span:
          return <span key={sliceIndex}>{slice.text}</span>;
        case Elements.strong:
          return <strong key={sliceIndex}>{slice.text}</strong>;
        case Elements.hyperlink:
          return (
            <a key={sliceIndex} href={slice.url} target={"_blank"} rel="noreferrer">
              {slice.text}
            </a>
          );
      }
    }
  });

  return <div className={styles.root}>{slices}</div>;
};

export { PostContent };
