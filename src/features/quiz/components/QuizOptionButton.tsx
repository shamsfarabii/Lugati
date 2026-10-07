import { Pressable, StyleSheet, Text, View } from 'react-native';

import { type ThemeColors, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SIZES, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { commonStyles } from '@/styles/commonStyles';

export type QuizOptionState = 'idle' | 'correct' | 'incorrect' | 'muted';

type QuizOptionButtonProps = {
  letter: string;
  label: string;
  state: QuizOptionState;
  disabled: boolean;
  onPress: () => void;
};

export function QuizOptionButton({
  letter,
  label,
  state,
  disabled,
  onPress,
}: QuizOptionButtonProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={`Option ${letter}: ${label}`}
      style={({ pressed }) => [
        styles.option,
        commonStyles.row,
        commonStyles.alignCenter,
        state === 'correct' && styles.optionCorrect,
        state === 'incorrect' && styles.optionIncorrect,
        state === 'muted' && styles.optionMuted,
        pressed && !disabled && styles.optionPressed,
      ]}
    >
      <View
        style={[
          styles.badge,
          commonStyles.centered,
          state === 'correct' && styles.badgeCorrect,
          state === 'incorrect' && styles.badgeIncorrect,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            state === 'correct' && styles.badgeTextOnFilled,
            state === 'incorrect' && styles.badgeTextOnFilled,
          ]}
        >
          {letter}
        </Text>
      </View>

      <Text
        style={[
          styles.label,
          state === 'correct' && styles.labelCorrect,
          state === 'incorrect' && styles.labelIncorrect,
          state === 'muted' && styles.labelMuted,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    option: {
      minHeight: SIZES.quizOptionMinHeight,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      gap: SPACING.md,
    },
    optionPressed: {
      backgroundColor: colors.surfacePressed,
      transform: [{ scale: 0.995 }],
    },
    optionCorrect: {
      borderColor: colors.borderSuccess,
      backgroundColor: colors.surfaceSuccess,
    },
    optionIncorrect: {
      borderColor: colors.borderDanger,
      backgroundColor: colors.surfaceDanger,
    },
    optionMuted: {
      opacity: 0.6,
    },
    badge: {
      width: SIZES.quizOptionBadge,
      height: SIZES.quizOptionBadge,
      borderRadius: BORDER_RADIUS.sm,
      backgroundColor: colors.surfaceMuted,
    },
    badgeCorrect: {
      backgroundColor: colors.primary,
    },
    badgeIncorrect: {
      backgroundColor: colors.danger,
    },
    badgeText: {
      fontSize: FONT_SIZES.md,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.primary,
    },
    badgeTextOnFilled: {
      color: colors.textOnPrimary,
    },
    label: {
      flex: 1,
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.semibold,
      color: colors.text,
    },
    labelCorrect: {
      color: colors.primaryLight,
    },
    labelIncorrect: {
      color: colors.danger,
    },
    labelMuted: {
      color: colors.textMuted,
    },
  });
}
