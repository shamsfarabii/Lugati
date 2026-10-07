import { Image } from 'expo-image';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { AppIcon, type AppIconName } from '@/components/ui/AppIcon';
import { type ThemeColors, BORDER_RADIUS, ICON_SIZES, SIZES } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';
import { commonStyles } from '@/styles/commonStyles';

type IconButtonTone = 'neutral' | 'danger' | 'overlay';

export type IconButtonIcon =
  | AppIconName
  | { kind: 'symbol'; name: AppIconName }
  | { kind: 'image'; source: number };

type IconButtonProps = {
  icon: IconButtonIcon;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityHint?: string;
  tone?: IconButtonTone;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

function resolveIconButtonIcon(
  icon: IconButtonIcon,
): { kind: 'symbol'; name: AppIconName } | { kind: 'image'; source: number } {
  if (typeof icon === 'string') {
    return { kind: 'symbol', name: icon };
  }

  return icon;
}

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  tone = 'neutral',
  disabled = false,
  style,
}: IconButtonProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const resolvedIcon = resolveIconButtonIcon(icon);
  const iconColor =
    tone === 'neutral'
      ? colors.textMuted
      : tone === 'danger'
        ? colors.danger
        : colors.textOnPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      hitSlop={10}
      style={({ pressed }) => [
        styles.base,
        commonStyles.centered,
        tone === 'neutral' && styles.neutral,
        tone === 'danger' && styles.danger,
        tone === 'overlay' && styles.overlay,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {resolvedIcon.kind === 'image' ? (
        <Image
          source={resolvedIcon.source}
          style={styles.imageIcon}
          contentFit="contain"
          tintColor={iconColor}
          accessible={false}
        />
      ) : (
        <AppIcon name={resolvedIcon.name} size={ICON_SIZES.sm} color={iconColor} weight="semibold" />
      )}
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    base: {
      width: SIZES.iconButton,
      height: SIZES.iconButton,
      borderRadius: BORDER_RADIUS.round,
      borderWidth: 1,
    },
    neutral: {
      backgroundColor: colors.surfaceMuted,
      borderColor: colors.border,
    },
    danger: {
      backgroundColor: colors.surfaceDanger,
      borderColor: colors.borderDanger,
    },
    overlay: {
      backgroundColor: colors.imageScrim,
      borderColor: colors.decorationOverlay,
    },
    disabled: {
      opacity: 0.4,
    },
    pressed: {
      opacity: 0.7,
      transform: [{ scale: 0.96 }],
    },
    imageIcon: {
      width: ICON_SIZES.sm,
      height: ICON_SIZES.sm,
    },
  });
}
