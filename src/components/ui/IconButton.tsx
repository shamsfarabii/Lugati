import { Image } from 'expo-image';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { AppIcon, type AppIconName } from '@/components/ui/AppIcon';
import {
  BORDER_RADIUS,
  COLORS,
  ICON_SIZES,
  SIZES,
} from '@/constants/theme';
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

const TONE_ICON_COLOR: Record<IconButtonTone, string> = {
  neutral: COLORS.textMuted,
  danger: COLORS.danger,
  overlay: COLORS.textOnPrimary,
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
  const resolvedIcon = resolveIconButtonIcon(icon);
  const iconColor = TONE_ICON_COLOR[tone];

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

const styles = StyleSheet.create({
  base: {
    width: SIZES.iconButton,
    height: SIZES.iconButton,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
  },
  neutral: {
    backgroundColor: COLORS.surfaceMuted,
    borderColor: COLORS.border,
  },
  danger: {
    backgroundColor: COLORS.surfaceDanger,
    borderColor: COLORS.borderDanger,
  },
  overlay: {
    backgroundColor: COLORS.imageScrim,
    borderColor: COLORS.decorationOverlay,
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
