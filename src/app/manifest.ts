import type { MetadataRoute } from "next";
import icon from "./icon.png";
import { config } from "../config";

const themeColor = "#ffffff";

export default (): MetadataRoute.Manifest => ({
  name: config.title,
  short_name: config.title,
  theme_color: themeColor,
  background_color: themeColor,
  display: "standalone",
  orientation: "any",
  start_url: ".",
  id: "/",
  icons: [{ src: icon.src, purpose: "any", sizes: `${icon.height}x${icon.width}` }],
});
