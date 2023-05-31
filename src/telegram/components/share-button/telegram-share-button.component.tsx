import type { FC, PropsWithChildren } from "react";
import Link from "next/link";

type Props = PropsWithChildren<{ url: string; text?: string; className?: string }>;

const SHARE_BASE_URL = new URL("https://t.me/share/url");

const TelegramShareButton: FC<Props> = ({ url, text, className, children }) => {
  const shareUrl = new URL(SHARE_BASE_URL);
  shareUrl.searchParams.set("url", url);

  if (text) {
    shareUrl.searchParams.set("text", text);
  }

  return (
    <Link href={shareUrl} className={className}>
      {children}
    </Link>
  );
};

export { TelegramShareButton };
