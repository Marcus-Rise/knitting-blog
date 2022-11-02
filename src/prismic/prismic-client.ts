import { createClient as createPrismicClient, getRepositoryEndpoint } from "@prismicio/client";
import type { CreateClientConfig } from "@prismicio/next";
import { enableAutoPreviews } from "@prismicio/next";

const repoName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY ?? "";

const createClient = (config: CreateClientConfig = {}) => {
  const endpoint = getRepositoryEndpoint(repoName);
  const client = createPrismicClient(endpoint, config);

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

export { createClient };
