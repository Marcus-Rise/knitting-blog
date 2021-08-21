import type { DefaultClient } from "prismic-javascript/types/client";

const PRISMIC_SERVICE_PROVIDER = Symbol("IPrismicService");

interface IPrismicService {
  client: DefaultClient;
}

export type { IPrismicService };
export { PRISMIC_SERVICE_PROVIDER };
