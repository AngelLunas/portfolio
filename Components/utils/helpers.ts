import { theme, ThemeType } from '@styles/theme';

export const formatThemeValue = (value: string): string => {
  return value.toUpperCase();
};

export const getThemeColor = (color: keyof typeof theme.colors): string => {
  return theme.colors[color];
};

export type { ThemeType };
