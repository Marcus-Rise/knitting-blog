const SEO_CONFIG_SERVICE_PROVIDER = Symbol("ISeoConfigService");

interface ISeoConfigService {
  readonly allowRobots: boolean;
  readonly googleVerificationCode: string;
  readonly yandexVerificationCode: string;
}

export type { ISeoConfigService };
export { SEO_CONFIG_SERVICE_PROVIDER };
