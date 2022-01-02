import { useMemo } from "react";
import { DateToString, DateToStringSeo } from "./date-to-string.function";

const useDateToString = (date: string) => {
  const ui = useMemo(() => DateToString(date), [date]);
  const seo = useMemo(() => DateToStringSeo(date), [date]);

  return {
    ui,
    seo,
  };
};

export { useDateToString };
