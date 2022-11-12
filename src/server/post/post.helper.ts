import { inject } from "../ioc";
import type { IPostService } from "./service";
import { POST_SERVICE } from "./service";

const getPosts = () => inject((postService: IPostService) => postService.getAll(), [POST_SERVICE]);

const getPost = (uuid: string) =>
  inject((postService: IPostService) => postService.getByUUID(uuid), [POST_SERVICE]);

export { getPosts, getPost };
