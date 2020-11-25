const APP_SERVICE_PROVIDER = Symbol("IAppService");

interface IAppService {
  readonly title: string;
  readonly author: {
    readonly name: string;
    readonly url: string;
  };
}

export type { IAppService };
export { APP_SERVICE_PROVIDER };
