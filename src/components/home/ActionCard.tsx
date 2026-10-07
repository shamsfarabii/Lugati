import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HOME_MAX_FONT_SCALE } from '@/components/home/homeLayout';
import { AppIcon, type AppIconName } from '@/components/ui/AppIcon';
import { type ThemeColors, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, ICON_SIZES, SIZES, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';
import { createShadow } from '@/helpers/styleHelpers';
import { commonStyles } from '@/styles/commonStyles';

type ActionCardVariant = 'primary' | 'secondary';

type ActionCardIcon =
  | { kind: 'symbol'; name: AppIconName }
  | { kind: 'image'; source: number };

type ActionCardProps = {
  icon: ActionCardIcon;
  title: string;
  description: string;
  buttonLabel: string;
  variant: ActionCardVariant;
  onPress: () => void;
  isWide: boolean;
  disabled?: boolean;
  progressPercent?: number | null;
};

export function ActionCard({
  icon,
  title,
  description,
  buttonLabel,
  variant,
  onPress,
  isWide,
  disabled = false,
  progressPercent = null,
}: ActionCardProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const isPrimary = variant === 'primary';

  return (
    <View style={[styles.actionCard, isWide && styles.actionCardWide]}>
      <View style={[commonStyles.row, commonStyles.alignCenter]}>
        <View style={[commonStyles.centered, styles.actionIcon]}>
          {icon.kind === 'image' ? (
            <Image
              source={icon.source}
              style={styles.imageIcon}
              contentFit="contain"
              tintColor={colors.primary}
              accessible={false}
            />
          ) : (
            <AppIcon name={icon.name} size={ICON_SIZES.xl} color={colors.primary} />
          )}
        </View>

        <View style={[commonStyles.grow, styles.actionContent]}>
          <Text style={styles.actionTitle} maxFontSizeMultiplier={HOME_MAX_FONT_SCALE}>
            {title}
          </Text>
          <Text
            style={styles.actionDescription}
            numberOfLines={2}
            maxFontSizeMultiplier={HOME_MAX_FONT_SCALE}
          >
            {description}
          </Text>
        </View>
      </View>

      {progressPercent !== null ? (
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: progressPercent }}
        >
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          isPrimary ? styles.primaryButton : styles.secondaryButton,
          commonStyles.row,
          commonStyles.spaceBetween,
          commonStyles.alignCenter,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <Text
          style={isPrimary ? styles.primaryButtonText : styles.secondaryButtonText}
          numberOfLines={1}
          maxFontSizeMultiplier={HOME_MAX_FONT_SCALE}
        >
          {buttonLabel}
        </Text>
        <AppIcon
          name="arrowRight"
          size={ICON_SIZES.md}
          color={variant === 'primary' ? colors.textOnPrimary : colors.primary}
          weight="bold"
        />
      </Pressable>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  const cardShadow = createShadow(2, colors.shadow, 0.06, 10, { width: 0, height: 4 });
  return StyleSheet.create({
    actionCard: {
      gap: SPACING.lg,
      padding: SPACING.lg,
      borderRadius: BORDER_RADIUS.card,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...cardShadow,
    },
    actionCardWide: {
      flex: 1,
      justifyContent: 'space-between',
      minWidth: 0,
    },
    actionIcon: {
      width: SIZES.practiceIcon,
      height: SIZES.practiceIcon,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surfaceMuted,
    },
    imageIcon: {
      width: ICON_SIZES.xl,
      height: ICON_SIZES.xl,
    },
    actionContent: {
      marginLeft: SPACING.md - 2,
      minWidth: 0,
    },
    actionTitle: {
      fontSize: FONT_SIZES.xxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
    },
    actionDescription: {
      marginTop: 3,
      fontSize: FONT_SIZES.md,
      color: colors.textMuted,
    },
    progressTrack: {
      height: SIZES.quizTimerTrackHeight,
      borderRadius: BORDER_RADIUS.round,
      backgroundColor: colors.surfaceMuted,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: BORDER_RADIUS.round,
      backgroundColor: colors.primary,
    },
    primaryButton: {
      minHeight: SIZES.primaryButtonHeight,
      paddingHorizontal: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: colors.primary,
      gap: SPACING.sm,
    },
    secondaryButton: {
      minHeight: SIZES.primaryButtonHeight,
      paddingHorizontal: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
      gap: SPACING.sm,
    },
    buttonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.99 }],
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    primaryButtonText: {
      flexShrink: 1,
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.textOnPrimary,
    },
    secondaryButtonText: {
      flexShrink: 1,
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.primary,
    },
  });
}
