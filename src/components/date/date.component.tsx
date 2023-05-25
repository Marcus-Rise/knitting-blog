import type { FC, HTMLAttributes } from "react";
import styles from "./date.module.scss";
import classNames from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatPostDate = (date: Date | string) => {
  const exactlyDate = new Date(date);

  return {
    ui: format(exactlyDate, "LLLL d, yyyy", { locale: ru }),
    html: format(exactlyDate, "yyyy-MM-dd", { locale: ru }),
  };
};

const DateComponent: FC<HTMLAttributes<HTMLTimeElement> & { date: string | Date }> = ({
  date,
  className,
  ...props
}) => {
  const { ui, html } = formatPostDate(date);

  return (
    <time {...props} className={classNames(styles.date, className)} dateTime={html}>
      {ui}
    </time>
  );
};

export { DateComponent };
