"use client";
import type { FC } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { ThemePreference, useTheme } from "@marcus-rise/react-theme";
import { Theme as ThemeEnum, ThemeToggle } from "./theme-toggle.component";

type ThemeProps = { className?: string };
const THEME_DATA_KEY = "data-theme";

const Theme: FC<ThemeProps> = ({ className }) => {
  const { isDarkTheme, preferences, setTheme, resetThemeToSystem } = useTheme();

  const value = useMemo(() => {
    let value: ThemeEnum;

    switch (preferences) {
      case ThemePreference.LIGHT: {
        value = ThemeEnum.LIGHT;
        break;
      }
      case ThemePreference.DARK: {
        value = ThemeEnum.DARK;
        break;
      }
      default: {
        value = ThemeEnum.SYSTEM;
        break;
      }
    }

    return value;
  }, [preferences]);

  const changeTheme = useCallback(
    (theme: ThemeEnum) => {
      switch (theme) {
        case ThemeEnum.DARK:
          setTheme(ThemePreference.DARK);
          break;
        case ThemeEnum.LIGHT:
          setTheme(ThemePreference.LIGHT);
          break;
        default:
          resetThemeToSystem();
          break;
      }
    },
    [resetThemeToSystem, setTheme],
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute(THEME_DATA_KEY, "dark");
    } else {
      document.documentElement.setAttribute(THEME_DATA_KEY, "light");
    }
  }, [isDarkTheme]);

  return <ThemeToggle className={className} value={value} onChange={changeTheme} />;
};

export { Theme };
