import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { type ThemeColors, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import type { QuizAnswerRecord, QuizResult } from '@/features/quiz/types/quiz.types';
import { createShadow } from '@/helpers/styleHelpers';
import { commonStyles } from '@/styles/commonStyles';

type QuizResultViewProps = {
  result: QuizResult;
  onAttemptAnother: () => void;
  onBackToVocabulary: () => void;
};

function answerVerdict(answer: QuizAnswerRecord): string {
  if (answer.wasCorrect) {
    return '✓ Correct';
  }

  return answer.timedOut ? '✗ Timed out' : '✗ Wrong';
}

export function QuizResultView({
  result,
  onAttemptAnother,
  onBackToVocabulary,
}: QuizResultViewProps) {
  const styles = useThemedStyles(createStyles);

  const { attempt, answers, accuracyPercent } = result;

  return (
    <View style={commonStyles.grow}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.scoreCard, commonStyles.centered]}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>
            {attempt.correctAnswers} / {attempt.totalQuestions}
          </Text>

          <View style={[commonStyles.row, styles.statsRow]}>
            <View style={[commonStyles.centered, styles.stat]}>
              <Text style={styles.statValue}>{attempt.correctAnswers}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={[commonStyles.centered, styles.stat]}>
              <Text style={styles.statValue}>{attempt.wrongAnswers}</Text>
              <Text style={styles.statLabel}>Wrong</Text>
            </View>
            <View style={[commonStyles.centered, styles.stat]}>
              <Text style={styles.statValue}>{accuracyPercent}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your answers</Text>

        <View style={styles.answerList}>
          {answers.map((answer, index) => (
            <View
              key={`${answer.position}-${answer.promptWord}`}
              style={[styles.answerRow, index !== answers.length - 1 && styles.answerRowBorder]}
            >
              <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.alignCenter]}>
                <Text style={styles.answerIndex}>{answer.position + 1}.</Text>
                <Text style={styles.answerWord}>{answer.promptWord}</Text>
              </View>

              <Text style={styles.answerLine}>
                Your answer: <Text style={styles.answerValue}>{answer.selectedAnswer ?? 'No answer'}</Text>
              </Text>
              <Text style={styles.answerLine}>
                Correct answer: <Text style={styles.answerValue}>{answer.correctAnswer}</Text>
              </Text>

              <Text style={[styles.verdict, answer.wasCorrect ? styles.verdictCorrect : styles.verdictWrong]}>
                {answerVerdict(answer)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <PrimaryButton label="Attempt Another Quiz" onPress={onAttemptAnother} />
        <PrimaryButton
          label="Back to Vocabulary"
          onPress={onBackToVocabulary}
          variant="secondary"
        />
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  const cardShadow = createShadow(2, colors.shadow, 0.06, 4);
  return StyleSheet.create({
    content: {
      paddingBottom: SPACING.lg,
    },
    scoreCard: {
      padding: SPACING.xl,
      borderRadius: BORDER_RADIUS.card,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: SPACING.lg,
      ...cardShadow,
    },
    scoreLabel: {
      fontSize: FONT_SIZES.md,
      color: colors.textMuted,
    },
    scoreValue: {
      marginTop: SPACING.xs,
      fontSize: FONT_SIZES.stat,
      lineHeight: 50,
      fontWeight: FONT_WEIGHTS.extraBold,
      color: colors.primaryLight,
    },
    statsRow: {
      alignSelf: 'stretch',
      marginTop: SPACING.md,
      paddingTop: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    stat: {
      flex: 1,
      gap: 2,
    },
    statValue: {
      fontSize: FONT_SIZES.xxxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
    },
    statLabel: {
      fontSize: FONT_SIZES.sm,
      color: colors.textMuted,
    },
    sectionTitle: {
      fontSize: FONT_SIZES.xxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    answerList: {
      borderRadius: BORDER_RADIUS.xxl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      overflow: 'hidden',
    },
    answerRow: {
      padding: SPACING.md,
      gap: 2,
    },
    answerRowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    answerIndex: {
      fontSize: FONT_SIZES.md,
      fontWeight: FONT_WEIGHTS.semibold,
      color: colors.textMuted,
    },
    answerWord: {
      fontSize: FONT_SIZES.display,
      fontWeight: FONT_WEIGHTS.semibold,
      color: colors.arabicWord,
    },
    answerLine: {
      marginTop: SPACING.xs,
      fontSize: FONT_SIZES.md,
      color: colors.textMuted,
    },
    answerValue: {
      fontWeight: FONT_WEIGHTS.semibold,
      color: colors.text,
    },
    verdict: {
      marginTop: SPACING.sm,
      fontSize: FONT_SIZES.md,
      fontWeight: FONT_WEIGHTS.bold,
    },
    verdictCorrect: {
      color: colors.primary,
    },
    verdictWrong: {
      color: colors.danger,
    },
    actions: {
      gap: SPACING.sm,
      paddingTop: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
  });
}
