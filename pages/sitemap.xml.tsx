import type { GetServerSideProps } from "next";
import { inject } from "../src/ioc";
import type { ISeoService } from "../src/seo";
import { SEO_SERVICE_PROVIDER } from "../src/seo";

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

export default () => {};
export { getServerSideProps };
