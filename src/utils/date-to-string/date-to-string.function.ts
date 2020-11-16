import { format } from "date-fns";
import { ru } from "date-fns/locale";

const DateToString = (date: string): string => {
  return format(new Date(date), "LLLL d, yyyy", { locale: ru });
};

export { DateToString };
