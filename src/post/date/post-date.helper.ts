import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatPostDate = (date: Date | string) => {
  const exactlyDate = new Date(date);

  return {
    ui: format(exactlyDate, "LLLL d, yyyy", { locale: ru }),
    html: format(exactlyDate, "yyyy-MM-dd", { locale: ru }),
  };
};

export { formatPostDate };
