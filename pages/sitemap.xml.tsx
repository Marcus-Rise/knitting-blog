import type { GetServerSideProps } from "next";
import type { ISeoService } from "../src/server";
import { inject, SEO_SERVICE_PROVIDER } from "../src/server";

const getServerSideProps: GetServerSideProps = async (
  { req, res },
  seo = inject<ISeoService>(SEO_SERVICE_PROVIDER),
) => {
  const sitemap = await seo.generateSitemap(String(req.headers.host));

  res.setHeader("Content-Type", "application/xml");
  res.end(sitemap);

  return {
    props: {},
  };
};

const Sitemap = () => {};

export default Sitemap;
export { getServerSideProps };
