import type { FC } from "react";
import React from "react";
import { Elements } from "prismic-reactjs";
import type { IPostContent } from "../../../../../common/post";
import { SliceTypeEnum } from "../../../../../server/post/repository";
import { ImageGallery } from "../../../../components";
import styled from "styled-components";
import { colors } from "../../../../styles";

interface IProps {
  content: IPostContent;
}

const Root = styled.div`
  line-height: 1.75rem;

  li {
    line-height: 1.75rem;
    letter-spacing: 0.2em;

    &::marker {
      color: ${colors.accent};
      font-size: 1.3rem;
    }
  }
`;

const PostContent: FC<IProps> = ({ content }) => {
  const slices = content.map((slice, sliceIndex) => {
    if (slice.type === SliceTypeEnum.IMAGE_GALLERY) {
      return (
        <ImageGallery
          key={sliceIndex}
          items={slice.items.map((i) => ({ src: i.url, alt: i.alt, size: i.height }))}
        />
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

  return <Root>{slices}</Root>;
};

export { PostContent };
