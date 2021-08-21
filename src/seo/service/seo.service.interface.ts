interface ISeoService {
  generateSitemap(hostName: string): Promise<string>;

  generateRobotsTxt(hostName: string): Promise<string>;
}

export type { ISeoService };
