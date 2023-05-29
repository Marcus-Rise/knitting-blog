import type { MetadataRoute } from "next";
import icon from "./icon.png";
import { config } from "../config";

const themeColor = "#ffffff";

const manifest = (): MetadataRoute.Manifest => ({
  name: config.title,
  short_name: config.title,
  theme_color: themeColor,
  background_color: themeColor,
  display: "standalone",
  orientation: "any",
  start_url: ".",
  id: "/",
  icons: [
    { src: icon.src, purpose: "any", sizes: `${icon.height}x${icon.width}` },
    { src: icon.src, purpose: "maskable", sizes: `${icon.height}x${icon.width}` },
  ],
});

export default manifest;
