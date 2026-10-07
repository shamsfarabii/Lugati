import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/ui/AppIcon';
import { type ThemeColors, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, ICON_SIZES, SIZES, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';
import { commonStyles } from '@/styles/commonStyles';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
};

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightAction,
}: ScreenHeaderProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.wrapper}>
      <View style={[commonStyles.row, commonStyles.alignCenter, styles.header]}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.iconButton,
              commonStyles.centered,
              pressed && styles.iconButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <AppIcon
              name="chevronLeft"
              size={ICON_SIZES.lg}
              color={colors.primary}
              weight="bold"
            />
          </Pressable>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightSlot}>
          {rightAction ?? <View style={styles.iconPlaceholder} />}
        </View>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: SPACING.lg,
    },
    header: {
      marginBottom: 0,
    },
    iconButton: {
      width: SIZES.headerIconButton,
      height: SIZES.headerIconButton,
      borderRadius: BORDER_RADIUS.sm,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconButtonPressed: {
      backgroundColor: colors.surfacePressed,
    },
    iconPlaceholder: {
      width: SIZES.headerIconButton,
      height: SIZES.headerIconButton,
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: FONT_SIZES.xxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
    },
    subtitle: {
      marginTop: SPACING.sm,
      textAlign: 'center',
      fontSize: FONT_SIZES.md,
      lineHeight: 20,
      color: colors.textMuted,
      paddingHorizontal: SPACING.md,
    },
    rightSlot: {
      minWidth: SIZES.headerIconButton,
      alignItems: 'flex-end',
    },
  });
}
