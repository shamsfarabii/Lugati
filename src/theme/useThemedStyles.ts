import { useMemo } from 'react';

import type { ThemeColors } from '@/constants/theme';

import { useTheme } from '@/theme/useTheme';

export function useThemedStyles<T>(createStyles: (colors: ThemeColors) => T): T {
  const { colors } = useTheme();

  return useMemo(() => createStyles(colors), [colors, createStyles]);
}
