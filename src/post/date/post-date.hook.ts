import { useMemo } from "react";
import { formatPostDate } from "./post-date.helper";

const useFormattedPostDate = (date: Date | string) => useMemo(() => formatPostDate(date), [date]);

export { useFormattedPostDate };
