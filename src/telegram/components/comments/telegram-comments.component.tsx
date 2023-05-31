"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Script from "next/script";
import { useTheme } from "@marcus-rise/react-theme";

const dataColorLight = "#019c8c";
const dataColorDark = "#01b8a5s";

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

  return (
    <Script
      id={dataTelegramDiscussion}
      async
      strategy={"lazyOnload"}
      src="https://telegram.org/js/telegram-widget.js?22"
      data-telegram-discussion={dataTelegramDiscussion}
      data-comments-limit={commentsLimit}
      data-color={dataColorLight}
      data-dark={dataDark}
      data-dark-color={dataColorDark}
    />
  );
};

export { TelegramComments };
