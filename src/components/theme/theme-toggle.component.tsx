import type { FC } from "react";
import styles from "./theme-toggle.module.scss";
import classNames from "classnames";
import { MoonIcon, SunIcon } from "../icons";

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

const ICON_SIZE = "1.5rem";

const ThemeToggle: FC<ThemeToggleProps> = ({ className, onChange, value = Theme.SYSTEM }) => {
  const selectDark = () => onChange(Theme.DARK);
  const selectLight = () => onChange(Theme.LIGHT);
  const selectSystem = () => onChange(Theme.SYSTEM);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <button className={styles.icon} onClick={selectDark}>
        <MoonIcon width={ICON_SIZE} height={ICON_SIZE} />
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
        <SunIcon width={ICON_SIZE} height={ICON_SIZE} />
      </button>
    </div>
  );
};

export { ThemeToggle, Theme };
