import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import type { NextApiHandler } from "next";
import { createClient } from "../../prismic/prismic-client";

const Preview: NextApiHandler = async (req, res) => {
  const client = createClient({ req });

  await setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client });
};

export default Preview;
