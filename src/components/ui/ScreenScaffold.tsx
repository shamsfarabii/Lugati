import { ScrollView, StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SPACING, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

type ScreenScaffoldProps = ViewProps & {
  scroll?: boolean;
  contentContainerStyle?: ViewProps['style'];
};

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.section,
    },
    flex: {
      flex: 1,
    },
  });
}

export function ScreenScaffold({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  ...viewProps
}: ScreenScaffoldProps) {
  const styles = useThemedStyles(createStyles);

  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, styles.flex]}>
      <View
        style={[styles.content, styles.flex, contentContainerStyle, style]}
        {...viewProps}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
