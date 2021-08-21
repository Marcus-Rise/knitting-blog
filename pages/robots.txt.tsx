import type { GetServerSideProps } from "next";
import { inject } from "../src/ioc";
import type { ISeoService } from "../src/seo";
import { SEO_SERVICE_PROVIDER } from "../src/seo";

const getServerSideProps: GetServerSideProps = async (
  { req, res },
  seo = inject<ISeoService>(SEO_SERVICE_PROVIDER),
) => {
  const str = await seo.generateRobotsTxt(String(req.headers.host));

  res.setHeader("Content-Type", "text/plain");
  res.end(str);

  return {
    props: {},
  };
};

const Robots = () => {};

export default Robots;
export { getServerSideProps };
