type DataLayer = unknown[];
declare var dataLayer: DataLayer;

const gtag = (...ags: DataLayer) => {
  dataLayer.push(ags);
};

const initGoogleAnalytics = (id: string) => {
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];

  gtag("js", new Date());

  gtag("config", id);
};

export { initGoogleAnalytics };
