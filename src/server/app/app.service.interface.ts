const APP_SERVICE_PROVIDER = Symbol("IAppService");

interface IAppAuthor {
  name: string;
  url: string;
}

interface IAppService {
  readonly title: string;
  readonly author: IAppAuthor;
}

export type { IAppService, IAppAuthor };
export { APP_SERVICE_PROVIDER };
