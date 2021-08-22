import type { GetServerSideProps } from "next";
import type { ISeoService } from "../src/server";
import { inject, SEO_SERVICE_PROVIDER } from "../src/server";

const getServerSideProps: GetServerSideProps = async (
  { req, res },
  seo = inject<ISeoService>(SEO_SERVICE_PROVIDER),
) => {
  const hostName = "https://" + String(req.headers.host);
  const str = await seo.generateRobotsTxt(hostName);

  res.setHeader("Content-Type", "text/plain");
  res.end(str);

  return {
    props: {},
  };
};

const Robots = () => {};

export default Robots;
export { getServerSideProps };
