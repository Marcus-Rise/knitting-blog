type Layout = "fill" | "fixed" | "fixed-height" | "flex-item" | "intrinsic" | "nodisplay" | "responsive" | "container";

declare namespace JSX {
  interface AmpImg {
    alt?: string;
    src?: string;
    width?: string | number;
    height?: string | number;
    layout?: Layout;
  }

  interface IntrinsicElements {
    "amp-img": AmpImg;
  }
}
