import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ActionCard } from '@/components/home/ActionCard';
import type { HomeReviewCard } from '@/components/home/buildHomeView';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '@/constants/theme';

const REVIEW_ICON = require('../../../assets/icons/review.svg') as number;
const QUIZ_ICON = require('../../../assets/icons/quiz.svg') as number;

type PracticeSectionProps = {
  isWide: boolean;
  review: HomeReviewCard;
  quizDescription: string;
};

export function PracticeSection({ isWide, review, quizDescription }: PracticeSectionProps) {
  const handleDailyReview = () => {
    if (review.sessionId) {
      router.push({
        pathname: '/review/session',
        params: { sessionId: review.sessionId },
      });
      return;
    }

    router.push('/review');
  };

  return (
    <View>
      <View style={[styles.actions, isWide && styles.actionsWide]}>
        <ActionCard
          icon={{ kind: 'image', source: REVIEW_ICON }}
          title="Daily Review"
          description={review.description}
          buttonLabel={review.buttonLabel}
          variant="secondary"
          disabled={review.isDisabled}
          onPress={handleDailyReview}
          isWide={isWide}
          progressPercent={review.progressPercent}
        />

        <ActionCard
          icon={{ kind: 'image', source: QUIZ_ICON }}
          title="Quiz"
          description={quizDescription}
          buttonLabel="Attempt Quiz"
          variant="primary"
          onPress={() => router.push('/quiz')}
          isWide={isWide}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm + SPACING.xs,
  },
  actions: {
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  actionsWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
