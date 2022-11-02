interface IHttpService {
  get(url: string, init?: RequestInit): Promise<Response>;
}

export type { IHttpService };
