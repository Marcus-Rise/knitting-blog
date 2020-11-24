const APP_SERVICE_PROVIDER = Symbol("IAppService");

interface ISiteConfig {
  title: string;
  author: {
    name: string;
    url: string;
  };
}

interface IAppService {
  prismicUrl: string;
  siteConfig: ISiteConfig;
  allowRobots: boolean;
}

export type { IAppService, ISiteConfig };
export { APP_SERVICE_PROVIDER };
