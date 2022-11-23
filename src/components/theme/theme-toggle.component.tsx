import type { FC } from "react";
import styles from "./theme-toggle.module.scss";
import classNames from "classnames";

enum Theme {
  DARK,
  LIGHT,
  SYSTEM,
}

type ThemeToggleProps = {
  className?: string;
  value?: Theme;
  onChange(theme: Theme): void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ className, onChange, value = Theme.SYSTEM }) => {
  const selectDark = () => onChange(Theme.DARK);
  const selectLight = () => onChange(Theme.LIGHT);
  const selectSystem = () => onChange(Theme.SYSTEM);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <button className={styles.icon} onClick={selectDark}>
        ☾
      </button>
      <button className={styles.toggle} onClick={selectSystem}>
        <span
          className={classNames(styles.toggleIcon, {
            [styles.toggleLeft]: value === Theme.DARK,
            [styles.toggleCenter]: value === Theme.SYSTEM,
            [styles.toggleRight]: value === Theme.LIGHT,
          })}
        />
      </button>
      <button className={styles.icon} onClick={selectLight}>
        ☀︎
      </button>
    </div>
  );
};

export { ThemeToggle, Theme };
