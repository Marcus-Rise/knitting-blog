const SEO_SERVICE_PROVIDER = Symbol("ISeoService");

interface ISeoService {
  generateSitemap(hostName: string): Promise<string>;
  generateRobotsTxt(hostName: string): Promise<string>;
}

export type { ISeoService };
export { SEO_SERVICE_PROVIDER };
