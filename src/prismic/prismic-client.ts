import * as prismic from "@prismicio/client";

const repoName = process.env.PRISMIC_REPOSITORY ?? "";
const endpoint = prismic.getRepositoryEndpoint(repoName);
const client = prismic.createClient(endpoint, { fetch });

export { client };
