const PRISMIC_CONFIG_SERVICE_PROVIDER = "IPrismicConfigService";

interface IPrismicConfigService {
  readonly endPoint: string;
  readonly authToken: string;
}

export { PRISMIC_CONFIG_SERVICE_PROVIDER };
export type { IPrismicConfigService };
