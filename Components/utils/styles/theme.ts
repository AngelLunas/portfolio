// Este archivo usa el alias @utils, creando la referencia circular
import { formatThemeValue } from '@utils/helpers';

export const theme = {
  colors: {
    primary: formatThemeValue('#007bff'),
    secondary: formatThemeValue('#6c757d')
  }
};

export type ThemeType = typeof theme;
