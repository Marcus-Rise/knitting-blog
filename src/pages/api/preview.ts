import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import type { NextApiHandler } from "next";
import { createClient } from "../../prismic/prismic-client";
import { linkResolver } from "../../prismic/prismic-link-resolver";

const Preview: NextApiHandler = async (req, res) => {
  const client = createClient({ req });

  await setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client, linkResolver });
};

export default Preview;
