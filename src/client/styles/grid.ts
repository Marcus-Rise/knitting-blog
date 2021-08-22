import { screenSizes } from "./variables";

const mediaMaxQuery = (width: number) => `@media (max-width: ${width}px)`;
const mediaMinQuery = (width: number) => `@media (min-width: ${width}px)`;

const media = {
  sm: mediaMaxQuery(screenSizes.sm),
  md: mediaMaxQuery(screenSizes.md),
  lg: mediaMinQuery(screenSizes.md + 1),
};

export { media };
