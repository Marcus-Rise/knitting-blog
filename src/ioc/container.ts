import { Container } from "inversify";
import { PostModule } from "../post";

const container = new Container();

container.load(PostModule);

export { container };
