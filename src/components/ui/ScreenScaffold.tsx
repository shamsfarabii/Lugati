import { useCallback, useRef, useState, type ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
  type ScrollViewInstance,
  type ViewInstance,
  type ViewProps,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { FormScrollCoordinator } from '@/components/ui/formScrollContext';
import { SPACING, type ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

type ScreenScaffoldProps = ViewProps & {
  scroll?: boolean;
  contentContainerStyle?: ViewProps['style'];
  /** Omit `bottom` on tab screens so content uses the stack slot above the bottom nav. */
  safeAreaEdges?: Edge[];
  /** Rendered above the scroll area so it stays visible (sticky) while content scrolls. */
  header?: ReactNode;
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
    scrollBody: {
      flexGrow: 1,
    },
    stickyHeader: {
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.md,
      backgroundColor: colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'transparent',
      zIndex: 1,
    },
    stickyHeaderScrolled: {
      borderBottomColor: colors.border,
    },
    contentBelowHeader: {
      paddingTop: SPACING.md,
    },
  });
}

export function ScreenScaffold({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  safeAreaEdges,
  header,
  ...viewProps
}: ScreenScaffoldProps) {
  const styles = useThemedStyles(createStyles);
  const safeAreaProps = safeAreaEdges ? { edges: safeAreaEdges } : {};
  const scrollRef = useRef<ScrollViewInstance>(null);
  const scrollContentRef = useRef<ViewInstance>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrolled = event.nativeEvent.contentOffset.y > 0;
    setIsScrolled((previous) => (previous === scrolled ? previous : scrolled));
  }, []);

  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea} {...safeAreaProps}>
        {header ? (
          <View style={[styles.stickyHeader, isScrolled && styles.stickyHeaderScrolled]}>
            {header}
          </View>
        ) : null}
        <FormScrollCoordinator scrollRef={scrollRef} contentRef={scrollContentRef}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={[
              styles.content,
              header ? styles.contentBelowHeader : null,
              contentContainerStyle,
            ]}
            onScroll={header ? handleScroll : undefined}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <View ref={scrollContentRef} collapsable={false} style={styles.scrollBody}>
              {children}
            </View>
          </ScrollView>
        </FormScrollCoordinator>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, styles.flex]} {...safeAreaProps}>
      {header ? <View style={styles.stickyHeader}>{header}</View> : null}
      <View
        style={[
          styles.content,
          styles.flex,
          header ? styles.contentBelowHeader : null,
          contentContainerStyle,
          style,
        ]}
        {...viewProps}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
