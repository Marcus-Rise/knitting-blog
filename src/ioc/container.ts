import { Container } from "inversify";
import { PostModule } from "../post";
import { AppModule } from "../app";
import { PrismicModule } from "../prismic";
import { SeoModule } from "../seo";

const container = new Container();

container.load(AppModule);
container.load(PrismicModule);
container.load(PostModule);
container.load(SeoModule);

export { container };
