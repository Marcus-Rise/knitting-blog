import { screenSizes } from "./variables";

const mediaQuery = (width: number) => `@media (max-width: ${width}px)`;

const media = {
  sm: mediaQuery(screenSizes.sm),
  md: mediaQuery(screenSizes.md),
};

export { media };
