import type { IPostRepository, PostRepositoryQuery } from "./post-repository.interface";
import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";
import { PostPreviewModelFactory, PostWithContentModelFactory } from "../../../post/model";
import { inject, injectable } from "inversify";
import type { IHttpService } from "../../utils/http";
import { HTTP_SERVICE } from "../../utils/http";
import type { IPostConfig } from "../config";
import { POST_CONFIG } from "../config";
import type { PostDocument } from "../../../prismic";

type PrismicPreviewDto = {
  label: string;
  ref: string;
  mainDocument: string;
  type: "DRAFT";
};

@injectable()
class PostRepository implements IPostRepository {
  constructor(
    @inject(POST_CONFIG) private readonly _config: IPostConfig,
    @inject(HTTP_SERVICE) private readonly _http: IHttpService,
  ) {}

  async getMasterRef(): Promise<string | undefined> {
    const url: URL = new URL("/api/v2", this._config.apiUrl);
    url.searchParams.append("access_token", this._config.apiToken);

    const response = await this._http.get(url.href);
    const data: {
      refs: Array<{
        id: string;
        ref: string;
        label: string;
        isMasterRef: boolean;
      }>;
    } = await response.json();

    return data.refs.find((ref) => ref.isMasterRef)?.ref;
  }

  async find(query?: Partial<PostRepositoryQuery>): Promise<PostWithContentModel | null> {
    let postDocument: PostDocument | undefined;

    const url: URL = new URL("/api/v2/documents/search", this._config.apiUrl);
    url.searchParams.append("q", `[[at(document.type,"post")]]`);
    url.searchParams.append("access_token", this._config.apiToken);

    if (!query?.previewRef) {
      const masterRef = await this.getMasterRef();

      if (!masterRef) {
        throw new Error("no master ref");
      }

      url.searchParams.append("ref", masterRef);

      if (query?.uuid) {
        url.searchParams.append("q", `[[at(my.post.uid,"${query.uuid}")]]`);
      } else if (query?.id) {
        url.searchParams.append("q", `[[at(my.post.id,"${query.id}")]]`);
      } else {
        throw new Error("no query params");
      }

      const response = await this._http.get(url.href);
      const dto: { results: Array<PostDocument> } = await response.json();
      postDocument = dto.results.at(0);
    } else {
      const previewResponse = await this._http.get(query.previewRef);
      const previewDto: PrismicPreviewDto = await previewResponse.json();

      url.searchParams.append("ref", previewDto.mainDocument);

      const response = await this._http.get(url.href);
      const dto: { results: Array<PostDocument> } = await response.json();
      postDocument = dto.results.at(0);
    }

    if (!postDocument) {
      return null;
    }

    return PostWithContentModelFactory.fromResponseDto(postDocument);
  }

  async list(query?: Partial<PostRepositoryQuery>): Promise<PostPreviewModel[]> {
    const masterRef = await this.getMasterRef();

    if (!masterRef) {
      throw new Error("no master ref");
    }

    const url = new URL("/api/v2/documents/search", this._config.apiUrl);
    url.searchParams.append("ref", masterRef);
    url.searchParams.append("access_token", this._config.apiToken);
    url.searchParams.append("q", `[[at(document.type,"post")]]`);
    url.searchParams.append("orderings", `[document.first_publication_date desc]`);

    if (query?.limit) {
      url.searchParams.append("pageSize", query?.limit?.toString());
    }

    if (query?.offsetPage) {
      url.searchParams.append("page", query?.offsetPage?.toString());
    }

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

    const response = await this._http.get(url.href);
    const dto: { results: Array<PostDocument> } = await response.json();

    return dto.results.map((i) => PostPreviewModelFactory.fromResponseDto(i));
  }
}

export { PostRepository };
