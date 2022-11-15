import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { getRobotsTxt, getSitemap } from "./server/seo/seo.helper";

const middleware: NextMiddleware = async (request) => {
  const host = request.nextUrl.hostname;

  if (request.nextUrl.pathname.startsWith("/sitemap.xml")) {
    const sitemap = await getSitemap(host);

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
