import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { AppIcon } from '@/components/ui/AppIcon';
import { ScreenHeader, ScreenSubtitle } from '@/components/ui/ScreenHeader';
import { ScreenScaffold } from '@/components/ui/ScreenScaffold';
import {
  type ThemeColors,
  BORDER_RADIUS,
  ICON_SIZES,
  SIZES,
  SPACING,
} from '@/constants/theme';
import {
  VocabularyForm,
  type VocabularyFormSubmitAction,
} from '@/features/vocabulary/components/VocabularyForm';
import { createVocabulary } from '@/features/vocabulary/services/vocabularyService';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { commonStyles } from '@/styles/commonStyles';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';

export default function NewVocabularyRoute() {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [submitAction, setSubmitAction] = useState<VocabularyFormSubmitAction | null>(
    null,
  );
  const allowLeave = useUnsavedChangesGuard(hasUnsavedChanges, {
    title: 'Discard this word?',
    message: 'What you have typed so far will not be saved.',
  });

  return (
    <ScreenScaffold
      header={
        <ScreenHeader
          title="Add Vocabulary"
          style={styles.stickyHeader}
          onBack={() => router.back()}
          rightAction={
            submitAction ? (
              <Pressable
                onPress={submitAction.submit}
                disabled={submitAction.isSubmitting}
                style={({ pressed }) => [
                  styles.headerSaveButton,
                  commonStyles.centered,
                  pressed && !submitAction.isSubmitting && styles.headerSaveButtonPressed,
                  submitAction.isSubmitting && styles.headerSaveButtonDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Save vocabulary"
                accessibilityState={{ disabled: submitAction.isSubmitting }}
              >
                {submitAction.isSubmitting ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <AppIcon
                    name="checkmark"
                    size={ICON_SIZES.md}
                    color={colors.primary}
                    weight="bold"
                  />
                )}
              </Pressable>
            ) : undefined
          }
        />
      }
    >
      <ScreenSubtitle
        text="Only the word and its meaning are required — everything else helps it stick."
        style={styles.subtitle}
      />
      <VocabularyForm
        submitLabel="Save word"
        onDirtyChange={setHasUnsavedChanges}
        onSubmitActionChange={setSubmitAction}
        onSubmit={async (values) => {
          await createVocabulary(values);
          allowLeave();
          router.replace('/vocabulary');
        }}
      />
    </ScreenScaffold>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    stickyHeader: {
      marginBottom: 0,
    },
    subtitle: {
      marginTop: 0,
      marginBottom: SPACING.lg,
    },
    headerSaveButton: {
      width: SIZES.headerIconButton,
      height: SIZES.headerIconButton,
      borderRadius: BORDER_RADIUS.sm,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerSaveButtonPressed: {
      backgroundColor: colors.surfacePressed,
    },
    headerSaveButtonDisabled: {
      opacity: 0.6,
    },
  });
}
