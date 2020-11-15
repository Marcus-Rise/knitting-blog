const APP_SERVICE_PROVIDER = Symbol("IAppService");

interface IAppService {
  prismicUrl: string;
}

export type { IAppService };
export { APP_SERVICE_PROVIDER };
