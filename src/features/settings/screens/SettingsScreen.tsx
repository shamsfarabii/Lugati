import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon, type AppIconName } from '@/components/ui/AppIcon';
import { FormSection } from '@/components/ui/FormSection';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ScreenScaffold } from '@/components/ui/ScreenScaffold';
import {
  GITHUB_RELEASES_PAGE_URL,
  LATEST_APK_DOWNLOAD_URL,
} from '@/constants/appLinks';
import {
  type AppearancePreference,
  type ThemeColors,
  BORDER_RADIUS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ICON_SIZES,
  SPACING,
} from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';
import { resetUserProgress } from '@/features/settings/services/settingsService';
import { createShadow } from '@/helpers/styleHelpers';
import { commonStyles } from '@/styles/commonStyles';
import { appAlert } from '@/utils/appAlert';
import { openExternalUrl } from '@/utils/openExternalUrl';

const APPEARANCE_OPTIONS: {
  value: AppearancePreference;
  label: string;
  icon: AppIconName;
}[] = [
  { value: 'system', label: 'System', icon: 'circleLefthalfFilled' },
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
];

export function SettingsScreen() {
  const { colors, appearancePreference, setAppearancePreference } = useTheme();
  const styles = useThemedStyles(createStyles);

  const [isResetting, setIsResetting] = useState(false);

  const runReset = useCallback(async () => {
    setIsResetting(true);

    try {
      await resetUserProgress();
      appAlert(
        'Progress reset',
        'Quiz scores, review history, and practice stats were cleared. Your vocabulary is unchanged.',
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not reset your progress.';
      appAlert('Reset failed', message);
    } finally {
      setIsResetting(false);
    }
  }, []);

  const openLatestApkDownload = useCallback(async () => {
    try {
      await openExternalUrl(LATEST_APK_DOWNLOAD_URL);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not open the download link.';
      appAlert('Download unavailable', message);
    }
  }, []);

  const openReleasesPage = useCallback(async () => {
    try {
      await openExternalUrl(GITHUB_RELEASES_PAGE_URL);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not open GitHub.';
      appAlert('Link unavailable', message);
    }
  }, []);

  const confirmResetProgress = useCallback(() => {
    appAlert(
      'Reset all progress?',
      'This removes quiz history, daily review sessions, and per-word practice stats. Your vocabulary words stay in your collection.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset progress',
          style: 'destructive',
          onPress: () => {
            void runReset();
          },
        },
      ],
    );
  }, [runReset]);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Settings" onBack={() => router.back()} />

      <FormSection title="Appearance" hint="Match your device or choose a fixed theme.">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Color theme</Text>
          <Text style={styles.cardBody}>
            System follows your phone or computer setting. Light and dark stay fixed until you
            change them.
          </Text>
          <View style={styles.appearanceRow} accessibilityRole="radiogroup">
            {APPEARANCE_OPTIONS.map((option) => {
              const isSelected = appearancePreference === option.value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    void setAppearancePreference(option.value);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={option.label}
                  style={({ pressed }) => [
                    styles.appearanceOption,
                    isSelected && styles.appearanceOptionSelected,
                    pressed && styles.appearanceOptionPressed,
                  ]}
                >
                  <AppIcon
                    name={option.icon}
                    size={ICON_SIZES.md}
                    color={isSelected ? colors.primary : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.appearanceLabel,
                      isSelected && styles.appearanceLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </FormSection>

      <FormSection
        title="Android app"
        style={styles.sectionSpacing}
        hint="Install or update Lugati outside the Play Store."
      >
        <View style={styles.card}>
          <View style={[commonStyles.row, styles.cardHeader]}>
            <View style={[commonStyles.centered, styles.iconChipDownload]}>
              <AppIcon name="importDoc" size={ICON_SIZES.md} color={colors.primary} />
            </View>
            <View style={commonStyles.grow}>
              <Text style={styles.cardTitle}>Latest APK on GitHub</Text>
              <Text style={styles.cardBody}>
                Download the newest Android build from our public GitHub releases. You may need
                to allow installs from your browser or file manager.
              </Text>
              {/* <Text
                style={styles.linkText}
                accessibilityRole="link"
                onPress={() => {
                  void openLatestApkDownload();
                }}
              >
                {LATEST_APK_DOWNLOAD_URL}
              </Text> */}
            </View>
          </View>

          <PrimaryButton
            label="Download latest APK"
            variant="secondary"
            leading={<AppIcon name="importDoc" size={ICON_SIZES.sm} color={colors.primary} />}
            onPress={() => {
              void openLatestApkDownload();
            }}
            accessibilityHint="Opens the latest Android APK download on GitHub"
          />

          <PrimaryButton
            label="All releases on GitHub"
            variant="secondary"
            onPress={() => {
              void openReleasesPage();
            }}
            accessibilityHint="Opens the GitHub releases page in your browser"
          />
        </View>
      </FormSection>

      <FormSection
        title="Learning data"
        hint="Use this if you want a fresh start without deleting your words."
        style={styles.sectionSpacing}
      >
        <View style={styles.card}>
          <View style={[commonStyles.row, styles.cardHeader]}>
            <View style={[commonStyles.centered, styles.iconChip]}>
              <AppIcon name="refresh" size={ICON_SIZES.md} color={colors.danger} />
            </View>
            <View style={commonStyles.grow}>
              <Text style={styles.cardTitle}>Reset all progress</Text>
              <Text style={styles.cardBody}>
                Clears quiz attempts, review sessions, accuracy stats, and quiz readiness.
                Vocabulary cards are not deleted.
              </Text>
            </View>
          </View>

          <PrimaryButton
            label="Reset progress"
            variant="danger"
            loading={isResetting}
            disabled={isResetting}
            onPress={confirmResetProgress}
            accessibilityHint="Opens a confirmation before clearing learning history"
          />
        </View>
      </FormSection>
    </ScreenScaffold>
  );
}

function createStyles(colors: ThemeColors) {
  const cardShadow = createShadow(2, colors.shadow, 0.06, 10, { width: 0, height: 4 });
  return StyleSheet.create({
    sectionSpacing: {
      marginTop: SPACING.lg,
    },
    card: {
      gap: SPACING.lg,
      padding: SPACING.lg,
      borderRadius: BORDER_RADIUS.card,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...cardShadow,
    },
    cardHeader: {
      gap: SPACING.md,
      alignItems: 'flex-start',
    },
    iconChip: {
      width: 40,
      height: 40,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surfaceDanger,
      borderWidth: 1,
      borderColor: colors.borderDanger,
    },
    iconChipDownload: {
      width: 40,
      height: 40,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surfaceMuted,
      borderWidth: 1,
      borderColor: colors.border,
    },
    linkText: {
      marginTop: SPACING.sm,
      fontSize: FONT_SIZES.sm,
      lineHeight: 18,
      color: colors.primary,
      textDecorationLine: 'underline',
    },
    cardTitle: {
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
    },
    cardBody: {
      marginTop: SPACING.xs,
      fontSize: FONT_SIZES.md,
      lineHeight: 20,
      color: colors.textMuted,
    },
    appearanceRow: {
      flexDirection: 'row',
      gap: SPACING.sm,
      marginTop: SPACING.sm,
    },
    appearanceOption: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.xs,
      minHeight: 72,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.xs,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
    },
    appearanceOptionSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.surfaceSuccess,
    },
    appearanceOptionPressed: {
      opacity: 0.88,
    },
    appearanceLabel: {
      fontSize: FONT_SIZES.sm,
      fontWeight: FONT_WEIGHTS.semibold,
      color: colors.textMuted,
    },
    appearanceLabelSelected: {
      color: colors.primary,
      fontWeight: FONT_WEIGHTS.bold,
    },
  });
}
