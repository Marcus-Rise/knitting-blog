import "reflect-metadata";
import type { NextApiRequest, NextApiResponse } from "next";
import { PreviewDto } from "../../src/prismic/preview.dto";
import { validate } from "class-validator";
import { inject } from "../../src/ioc";
import type { IPrismicService } from "../../src/prismic";
import { PRISMIC_SERVICE_PROVIDER } from "../../src/prismic";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  service = inject<IPrismicService>(PRISMIC_SERVICE_PROVIDER),
): Promise<void> => {
  const dto = new PreviewDto(String(req.query.token ?? ""), String(req.query.documentId ?? ""));

  const errors = await validate(dto);

  if (errors.length) {
    return res.status(400).json({ message: "Invalid dto" });
  } else {
    const url = await service.client
      .getPreviewResolver(dto.token, dto.documentId)
      .resolve((doc) => {
        return `/${doc.slugs[0]}`;
      }, "/");

    if (!url) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      res.setPreviewData({ ref: dto.token });

      res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
      );

      res.end();
    }
  }
};

export default handler;
