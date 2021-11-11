import { format } from "date-fns";

class SeoPostFactory {
  static toSitemapRaw({
    slug,
    date,
    hostName,
  }: {
    slug: string;
    date: string;
    hostName: string;
  }): string {
    const saveSlug = encodeURIComponent(slug);
    const url = !!saveSlug ? `${hostName}/${saveSlug}/` : `${hostName}/`;
    const lastEditDate = new Date(date);
    const dateStr = format(lastEditDate, "yyyy-MM-dd");

    return `<url>
      <loc>${url}</loc>
      <lastmod>${dateStr}</lastmod>
      </url>`;
  }
}

export { SeoPostFactory };
