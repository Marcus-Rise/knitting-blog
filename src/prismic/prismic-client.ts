import * as prismic from "@prismicio/client";
import type { CreateClientConfig } from "@prismicio/next";
import { enableAutoPreviews } from "@prismicio/next";

const createClient = (config: CreateClientConfig = {}) => {
  const repoName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY ?? "";
  const endpoint = prismic.getRepositoryEndpoint(repoName);
  const client = prismic.createClient(endpoint, config);

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

export { createClient };
