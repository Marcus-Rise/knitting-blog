import { Container } from "inversify";
import { PostModule } from "../post";
import { AppModule } from "../app";

const container = new Container();

container.load(AppModule);
container.load(PostModule);

export { container };
