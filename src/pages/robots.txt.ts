import type { GetServerSideProps } from "next";

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const hostName = "https://" + String(req.headers.host);
  const sections: Record<string, string> =
    process.env.ALLOW_ROBOTS === "true"
      ? {
          "User-agent": "*",
          Allow: "/",
          Sitemap: `${hostName}/sitemap.xml`,
        }
      : {
          "User-agent": "*",
          Disallow: "/",
          Sitemap: `${hostName}/sitemap.xml`,
        };

  const str = Object.keys(sections)
    .map((i) => `${i}: ${sections[i]}`)
    .join("\n");

  res.setHeader("Content-Type", "text/plain");
  res.end(str);

  return {
    props: {},
  };
};

const Robots = () => {};

export default Robots;
export { getServerSideProps };
