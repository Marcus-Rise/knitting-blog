import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });

process.env = {
  ...process.env,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ["test.com"],
    path: "/_next/image",
    loader: "default",
  },
};
