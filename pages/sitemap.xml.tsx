import type { GetServerSideProps } from "next";
import type { ISeoService } from "../src/server";
import { inject, SEO_SERVICE_PROVIDER } from "../src/server";
import * as punycode from "punycode";

const getServerSideProps: GetServerSideProps = async (
  { req, res },
  seo = inject<ISeoService>(SEO_SERVICE_PROVIDER),
) => {
  const hostName = "https://" + punycode.toUnicode(String(req.headers.host));
  const sitemap = await seo.generateSitemap(hostName);

  res.setHeader("Content-Type", "application/xml");
  res.end(sitemap);

  return {
    props: {},
  };
};

const Sitemap = () => {};

export default Sitemap;
export { getServerSideProps };
