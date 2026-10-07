import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';

import {
  type AppearancePreference,
  type ColorScheme,
  getColorsForScheme,
} from '@/constants/theme';
import {
  getAppearancePreference,
  saveAppearancePreference,
} from '@/features/settings/repositories/appearanceRepository';
import { ThemeContext, type ThemeContextValue } from '@/theme/useTheme';

function resolveColorScheme(
  preference: AppearancePreference,
  systemScheme: ColorSchemeName,
): ColorScheme {
  if (preference !== 'system') {
    return preference;
  }

  return systemScheme === 'dark' ? 'dark' : 'light';
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [appearancePreference, setAppearancePreferenceState] =
    useState<AppearancePreference>('system');

  useEffect(() => {
    let cancelled = false;

    getAppearancePreference()
      .then((preference) => {
        if (!cancelled) {
          setAppearancePreferenceState(preference);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  const colorScheme = resolveColorScheme(appearancePreference, systemColorScheme);
  const colors = getColorsForScheme(colorScheme);
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => undefined);
  }, [colors.background]);

  const setAppearancePreference = useCallback((preference: AppearancePreference) => {
    setAppearancePreferenceState(preference);
    saveAppearancePreference(preference).catch(() => undefined);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ colors, colorScheme, isDark, appearancePreference, setAppearancePreference }),
    [colors, colorScheme, isDark, appearancePreference, setAppearancePreference],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
}
