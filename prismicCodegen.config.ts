import type { Config } from "prismic-ts-codegen";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const config: Config = {
  output: "./src/prismic/types.generated.ts",
  repositoryName: process.env.PRISMIC_REPOSITORY,
  customTypesAPIToken: process.env.PRISMIC_CUSTOM_TYPE_AUTH_TOKEN,
  models: {
    fetchFromRepository: true,
  },
};

export default config;
