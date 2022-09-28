import type { FC, HTMLAttributes } from "react";
import styles from "./date.module.scss";
import classNames from "classnames";
import { useFormattedPostDate } from "../../post/date";

const DateComponent: FC<HTMLAttributes<HTMLTimeElement> & { date: string | Date }> = ({
  date,
  className,
  ...props
}) => {
  const { ui, html } = useFormattedPostDate(date);

  return (
    <time {...props} className={classNames(styles.date, className)} dateTime={html}>
      {ui}
    </time>
  );
};

export { DateComponent };
