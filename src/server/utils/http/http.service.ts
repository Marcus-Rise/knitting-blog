import { injectable } from "inversify";
import type { IHttpService } from "./http-service.interface";

@injectable()
class HttpService implements IHttpService {
  async get(url: string, config?: RequestInit): Promise<Response> {
    const headers = new Headers(config?.headers);
    headers.set("Accept", "application/json");

    const res = await fetch(url, {
      ...config,
      headers,
      method: "get",
    });

    if (!res.ok) {
      const text = await res.text();

      throw new Error(text);
    }

    return res;
  }
}

export { HttpService };
