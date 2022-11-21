import type { FC } from "react";
import { useMemo } from "react";
import { ThemePreference, useTheme } from "@marcus-rise/react-theme";
import styles from "./theme.module.scss";
import classNames from "classnames";

type ThemeProps = { className?: string };

const Theme: FC<ThemeProps> = ({ className }) => {
  const { preferences, toggleTheme } = useTheme();

  const { icon, title } = useMemo(() => {
    let meta: { icon: string; title: string };

    switch (preferences) {
      case ThemePreference.LIGHT: {
        meta = { title: "Light", icon: "☀︎" };
        break;
      }
      case ThemePreference.DARK: {
        meta = { title: "Dark", icon: "☾" };
        break;
      }
      default: {
        meta = { title: "System", icon: "⌽" };
        break;
      }
    }

    return meta;
  }, [preferences]);

  return (
    <button className={classNames(className, styles.button)} onClick={toggleTheme} title={title}>
      {icon}
    </button>
  );
};

export { Theme };
