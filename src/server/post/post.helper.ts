"use server";

import { inject } from "../ioc";
import type { IPostService } from "./service";
import { POST_SERVICE } from "./service";
import type { PreviewData } from "next";

const getPosts = (limit?: number, offset?: number) =>
  inject((postService: IPostService) => postService.getAll(limit, offset), [POST_SERVICE]);

const getPost = (uuid: string) =>
  inject((postService: IPostService) => postService.getByUUID(uuid), [POST_SERVICE]);

const getPreview = (preview: PreviewData) =>
  inject((postService: IPostService) => postService.getPreview(preview), [POST_SERVICE]);

const getPostSlug = (id: string) =>
  inject((postService: IPostService) => postService.getSlugByID(id), [POST_SERVICE]);

export { getPosts, getPost, getPreview, getPostSlug };
