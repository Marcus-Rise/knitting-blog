import { format } from "date-fns";
import { ru } from "date-fns/locale";

const DateToString = (date: string): string => {
  return date ? format(new Date(date), "LLLL d, yyyy", { locale: ru }) : "Не опубликовано";
};

export { DateToString };
