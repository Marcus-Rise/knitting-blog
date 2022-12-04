const getRobotsTxt = (hostName: string, isAllow: boolean): string => {
  const robots: Record<string, string> = isAllow
    ? {
        "User-agent": "*",
        Allow: "/",
        Sitemap: `https://${hostName}/sitemap.xml`,
      }
    : {
        "User-agent": "*",
        Disallow: "/",
        Sitemap: `https://${hostName}/sitemap.xml`,
      };

  return Object.keys(robots)
    .map((i) => `${i}: ${robots[i]}`)
    .join("\n");
};

const getSitemap = (hostname: string) =>
  fetch(new URL("/api/sitemap", hostname)).then((res) => res.text());

export { getRobotsTxt, getSitemap };
