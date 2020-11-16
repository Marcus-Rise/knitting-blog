import { Container } from "inversify";
import { PostModule } from "../post";
import { AppModule } from "../app";
import { PrismicModule } from "../prismic";

const container = new Container();

container.load(AppModule);
container.load(PrismicModule);
container.load(PostModule);

export { container };
