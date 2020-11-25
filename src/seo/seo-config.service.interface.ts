const SEO_CONFIG_SERVICE = Symbol("ISeoConfigService");

interface ISeoConfigService {
  readonly allowRobots: boolean;
}

export type { ISeoConfigService };
export { SEO_CONFIG_SERVICE };
