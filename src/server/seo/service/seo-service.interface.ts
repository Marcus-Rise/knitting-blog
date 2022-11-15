interface ISeoService {
  generateSitemapXml(hostName: string): Promise<string>;
}

export type { ISeoService };
