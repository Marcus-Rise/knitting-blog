const SEO_CONFIG_SERVICE_PROVIDER = Symbol("ISeoConfigService");

interface ISeoConfigService {
  readonly allowRobots: boolean;
}

export type { ISeoConfigService };
export { SEO_CONFIG_SERVICE_PROVIDER };
