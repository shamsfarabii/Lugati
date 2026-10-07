import { ScrollView, StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { SPACING, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

type ScreenScaffoldProps = ViewProps & {
  scroll?: boolean;
  contentContainerStyle?: ViewProps['style'];
  /** Omit `bottom` on tab screens so content uses the stack slot above the bottom nav. */
  safeAreaEdges?: Edge[];
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
      minHeight: 0,
    },
  });
}

export function ScreenScaffold({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  safeAreaEdges,
  ...viewProps
}: ScreenScaffoldProps) {
  const styles = useThemedStyles(createStyles);
  const safeAreaProps = safeAreaEdges ? { edges: safeAreaEdges } : {};

  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea} {...safeAreaProps}>
        <ScrollView
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, styles.flex]} {...safeAreaProps}>
      <View
        style={[styles.content, styles.flex, contentContainerStyle, style]}
        {...viewProps}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
