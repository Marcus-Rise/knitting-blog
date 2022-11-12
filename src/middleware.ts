import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { getRobotsTxt, getSiteMap } from "./seo";
import { getPosts } from "./server";

const middleware: NextMiddleware = async (request) => {
  const host = request.nextUrl.hostname;

  if (request.nextUrl.pathname.startsWith("/sitemap.xml")) {
    const posts = await getPosts();
    const sitemap = await getSiteMap(posts, host);

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }

  if (request.nextUrl.pathname.startsWith("/robots.txt")) {
    const isAllow = Boolean(process.env.ALLOW_ROBOTS);
    const robots = getRobotsTxt(host, isAllow);

    return new NextResponse(robots, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.next();
};

const config = {
  matcher: ["/sitemap.xml", "/robots.txt"],
};

export { middleware, config };
