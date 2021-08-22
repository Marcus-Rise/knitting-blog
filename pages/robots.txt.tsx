import type { GetServerSideProps } from "next";
import type { ISeoService } from "../src/server";
import { inject, SEO_SERVICE_PROVIDER } from "../src/server";
import * as punycode from "punycode";

const getServerSideProps: GetServerSideProps = async (
  { req, res },
  seo = inject<ISeoService>(SEO_SERVICE_PROVIDER),
) => {
  const hostName = "https://" + punycode.toUnicode(String(req.headers.host));
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
