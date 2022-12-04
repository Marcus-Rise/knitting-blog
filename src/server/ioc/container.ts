import "reflect-metadata";
import { Container } from "inversify";
import { PostModule } from "../post/post.module";
import { HttpModule } from "../utils/http/http.module";
import { SeoModule } from "../seo/seo.module";

const container = new Container({ defaultScope: "Singleton" });
container.load(HttpModule, PostModule, SeoModule);

export { container };
