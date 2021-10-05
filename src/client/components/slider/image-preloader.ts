import { useEffect } from "react";

class ImagePreloader {
  private _loaded: string[] = [];
  private _pool: HTMLImageElement[] = [];
  private _query: string[] = [];

  init(): void {
    this._pool = new Array(3).fill(0).map(() => new Image());
  }

  load(src: string): void {
    if (!this._pool.length) {
      this.init();
    }

    if (!this._loaded.includes(src)) {
      const loader = this._pool.shift();

      if (!loader) {
        this._query.push(src);
      } else {
        loader.src = src;
        loader.onload = () => {
          this._loaded.push(src);

          const query = this._query.shift();

          if (!query) {
            this._pool.push(loader);
          } else {
            loader.src = query;
          }
        };
      }
    }
  }
}

const preloader = new ImagePreloader();

const useImagePreloader = (images: string[]) => {
  useEffect(() => {
    images.map((src) => preloader.load(src));
  }, [images]);
};

export { ImagePreloader, useImagePreloader };
