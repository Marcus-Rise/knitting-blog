import type { FC, SVGProps } from "react";

declare global {
  type IconProps = SVGProps<SVGSVGElement>;
  type Icon = FC<IconProps>;
}
