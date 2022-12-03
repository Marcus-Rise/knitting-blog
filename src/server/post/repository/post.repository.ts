import type { IPostRepository, PostRepositoryQuery } from "./post-repository.interface";
import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";
import { PostPreviewModelFactory, PostWithContentModelFactory } from "../../../post/model";
import { inject, injectable } from "inversify";
import type { IHttpService } from "../../utils/http";
import { HTTP_SERVICE } from "../../utils/http";
import type { IPostConfig } from "../config";
import { POST_CONFIG } from "../config";
import type { PostDocument } from "../../../prismic";

@injectable()
class PostRepository implements IPostRepository {
  constructor(
    @inject(POST_CONFIG) private readonly _config: IPostConfig,
    @inject(HTTP_SERVICE) private readonly _http: IHttpService,
  ) {}

  async find(query?: Partial<PostRepositoryQuery>): Promise<PostWithContentModel | null> {
    const url = new URL("/api/v2/documents/search", this._config.apiUrl);
    url.searchParams.append("ref", this._config.masterRef);
    url.searchParams.append("q", `[[at(document.type,"post")]]`);

    if (query?.uuid) {
      url.searchParams.append("q", `[[at(my.post.uid,"${query.uuid}")]]`);
    } else if (query?.id) {
      url.searchParams.append("access_token", this._config.apiToken);
      url.searchParams.append("q", `[[at(my.post.id,"${query.id}")]]`);
    } else {
      throw new Error("no query params");
    }

    const response = await this._http.get(url.href);
    const dto: { results: Array<PostDocument> } = await response.json();

    const postDto = dto.results.at(0);

    if (!postDto) {
      return null;
    }

    return PostWithContentModelFactory.fromResponseDto(postDto);
  }

  async list(): Promise<PostPreviewModel[]> {
    const url = new URL("/api/v2/documents/search", this._config.apiUrl);
    url.searchParams.append("ref", this._config.masterRef);
    url.searchParams.append("q", `[[at(document.type,"post")]]`);
    url.searchParams.append("orderings", `[document.first_publication_date desc]`);
    url.searchParams.append("pageSize", `100`);
    url.searchParams.append(
      "graphQuery",
      `{
        post {
          title
          description
          main_image
        }
      }`
        .split("\n")
        .map((i) => i.replaceAll(/\s/g, ""))
        .join("\n"),
    );

    const dto: { results: Array<PostDocument> } = await this._http
      .get(url.href)
      .then((res) => res.json());

    return dto.results.map((i) => PostPreviewModelFactory.fromResponseDto(i));
  }
}

export { PostRepository };
