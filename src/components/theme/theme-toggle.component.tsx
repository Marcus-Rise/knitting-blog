import type { FC, MouseEventHandler } from "react";
import { useMemo } from "react";
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

const stopPropagation =
  (callBack: Function): MouseEventHandler =>
  (event) => {
    event.stopPropagation();

    return callBack();
  };

const TITLE_SYSTEM = "Установлено как в системе";
const TITLE_LIGHT = "Установлена светлая тема";
const TITLE_DARK = "Установлена темная тема";

const ThemeToggle: FC<ThemeToggleProps> = ({ className, onChange, value = Theme.SYSTEM }) => {
  const selectDark = () => onChange(Theme.DARK);
  const selectLight = () => onChange(Theme.LIGHT);
  const selectSystem = () => onChange(Theme.SYSTEM);

  const title = useMemo(() => {
    switch (value) {
      case Theme.SYSTEM: {
        return TITLE_SYSTEM;
      }
      case Theme.LIGHT: {
        return TITLE_LIGHT;
      }
      case Theme.DARK: {
        return TITLE_DARK;
      }
    }
  }, [value]);

  return (
    <div className={classNames(styles.wrapper, className)} title={title}>
      <button className={styles.icon} onClick={selectDark} aria-label={"Установить темную тему"}>
        <MoonIcon width={ICON_SIZE} height={ICON_SIZE} />
      </button>
      <button
        className={styles.toggle}
        onClick={selectSystem}
        aria-label={"Установить системную тему"}
      >
        <span
          className={classNames(styles.buttonOverlay, styles.buttonOverlayLeft)}
          onClick={stopPropagation(selectDark)}
        />
        <span
          className={classNames(styles.toggleIcon, {
            [styles.toggleLeft]: value === Theme.DARK,
            [styles.toggleCenter]: value === Theme.SYSTEM,
            [styles.toggleRight]: value === Theme.LIGHT,
          })}
        />
        <span
          className={classNames(styles.buttonOverlay, styles.buttonOverlayRight)}
          onClick={stopPropagation(selectLight)}
        />
      </button>
      <button className={styles.icon} onClick={selectLight} aria-label={"Установить светлую тему"}>
        <SunIcon width={ICON_SIZE} height={ICON_SIZE} />
      </button>
    </div>
  );
};

export { ThemeToggle, Theme };
