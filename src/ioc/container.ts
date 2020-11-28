import { Container } from "inversify";
import { PostModule } from "../post";
import { AppModule } from "../app";
import { PrismicModule } from "../prismic";
import { SeoModule } from "../seo";

const container = new Container();

container.load(AppModule, PrismicModule, PostModule, SeoModule);

export { container };
