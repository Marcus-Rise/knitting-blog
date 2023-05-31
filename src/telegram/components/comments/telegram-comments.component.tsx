"use client";

import type { ComponentProps, FC } from "react";
import { useCallback, useEffect, useMemo } from "react";
import Script from "next/script";
import { useTheme } from "@marcus-rise/react-theme";

const dataColorLight = "#019c8c";
const dataColorDark = "#01b8a5s";

const COMMENTS_CONTAINER_ID = "comments";

const TelegramComments: FC<{ telegramPostUrl: string; commentsLimit: number }> = ({
  telegramPostUrl,
  commentsLimit,
}) => {
  const { isDarkTheme } = useTheme();

  const dataDark = useMemo(() => (isDarkTheme ? "1" : undefined), [isDarkTheme]);

  const dataTelegramDiscussion = useMemo(
    () => new URL(telegramPostUrl).pathname,
    [telegramPostUrl],
  );
  const [channelName, postId] = useMemo(() => {
    const strings = dataTelegramDiscussion.split("/");
    const channelName = strings.at(-2);
    const postId = strings.at(-1);

    return [channelName, postId];
  }, [dataTelegramDiscussion]);

  const moveIframe: ComponentProps<typeof Script>["onReady"] = useCallback(() => {
    const iframe = document.querySelector(`#telegram-discussion--${channelName}-${postId}-1`);
    const container = document.querySelector(`#${COMMENTS_CONTAINER_ID}`);

    if (!container || !iframe) {
      return;
    }

    container.append(iframe);
  }, [channelName, postId]);

  const changeConfig = useCallback(() => {
    const iframe = document.querySelector(`#telegram-discussion--${channelName}-${postId}-1`);

    if (!iframe) {
      return;
    }

    const src = iframe.getAttribute("src");

    if (!src) {
      return;
    }

    const srcUrl = new URL(src);

    srcUrl.searchParams.set("dark", isDarkTheme ? "1" : "0");

    iframe.setAttribute("src", srcUrl.href);
  }, [channelName, isDarkTheme, postId]);

  useEffect(() => {
    changeConfig();
  }, [changeConfig]);

  return (
    <div id={COMMENTS_CONTAINER_ID}>
      <Script
        id={dataTelegramDiscussion}
        strategy={"lazyOnload"}
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-discussion={dataTelegramDiscussion}
        data-comments-limit={commentsLimit}
        data-color={dataColorLight}
        data-dark={dataDark}
        data-dark-color={dataColorDark}
        onReady={moveIframe}
      />
    </div>
  );
};

export { TelegramComments };
