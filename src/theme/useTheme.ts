import { createContext, useContext } from 'react';

import type { AppearancePreference, ColorScheme, ThemeColors } from '@/constants/theme';

export type ThemeContextValue = {
  colors: ThemeColors;
  colorScheme: ColorScheme;
  isDark: boolean;
  appearancePreference: AppearancePreference;
  setAppearancePreference: (preference: AppearancePreference) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return value;
}
