import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { ThemePreference, useTheme } from "@marcus-rise/react-theme";
import { Theme as ThemeEnum, ThemeToggle } from "./theme-toggle.component";

type ThemeProps = { className?: string };

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

  const changeTheme = (theme: ThemeEnum) => {
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
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkTheme]);

  return <ThemeToggle className={className} value={value} onChange={changeTheme} />;
};

export { Theme };
