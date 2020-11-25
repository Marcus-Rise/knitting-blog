const PRISMIC_CONFIG_SERVICE_PROVIDER = Symbol("IPrismicConfigService");

interface IPrismicConfigService {
  readonly endPoint: string;
  readonly authToken: string;
}

export { PRISMIC_CONFIG_SERVICE_PROVIDER };
export type { IPrismicConfigService };
