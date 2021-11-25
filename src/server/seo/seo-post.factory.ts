class SeoPostFactory {
  static toSitemapRaw({
    slug,
    hostName,
  }: {
    slug: string;
    date: string;
    hostName: string;
  }): string {
    const saveSlug = encodeURIComponent(slug);

    return !!saveSlug ? `${hostName}/${saveSlug}/` : `${hostName}/`;
  }
}

export { SeoPostFactory };
