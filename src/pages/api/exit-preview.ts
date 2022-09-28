import { exitPreview } from "@prismicio/next";
import type { NextApiHandler } from "next";

const ExitPreview: NextApiHandler = async (req, res) => {
  await exitPreview({ res, req });
};

export default ExitPreview;
