import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { type ThemeColors, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SIZES, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';
import { commonStyles } from '@/styles/commonStyles';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  /** Shows a spinner in place of the leading slot and blocks presses. */
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: StyleProp<ViewStyle>;
  leading?: ReactNode;
  trailing?: ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  leading,
  trailing,
  accessibilityLabel,
  accessibilityHint,
}: PrimaryButtonProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const isBlocked = disabled || loading;
  const spinnerColor = variant === 'primary' ? colors.textOnPrimary : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isBlocked}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isBlocked, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        commonStyles.row,
        commonStyles.centered,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        disabled && styles.disabled,
        pressed && !isBlocked && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        leading
      )}
      <Text
        style={[
          styles.label,
          variant === 'secondary' && styles.secondaryLabel,
          variant === 'danger' && styles.dangerLabel,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {trailing}
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    base: {
      minHeight: SIZES.primaryButtonHeight,
      paddingHorizontal: 18,
      borderRadius: BORDER_RADIUS.lg,
      gap: SPACING.sm,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    danger: {
      backgroundColor: colors.surfaceDanger,
      borderWidth: 1,
      borderColor: colors.borderDanger,
    },
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.99 }],
    },
    label: {
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.textOnPrimary,
    },
    secondaryLabel: {
      color: colors.primary,
    },
    dangerLabel: {
      color: colors.danger,
    },
  });
}
