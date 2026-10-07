import { Image } from 'expo-image';
import { router, usePathname, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon, type AppIconName } from '@/components/ui/AppIcon';
import { type ThemeColors, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS, ICON_SIZES, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { useTheme } from '@/theme/useTheme';
import { createShadow } from '@/helpers/styleHelpers';

type NavKey = 'home' | 'quiz' | 'review' | 'settings';

type NavItemIcon =
  | { kind: 'symbol'; name: AppIconName }
  | { kind: 'image'; source: number };

type NavItem = {
  key: NavKey;
  label: string;
  icon: NavItemIcon;
  href: Href;
};

const QUIZ_ICON = require('../../../assets/icons/quiz.svg') as number;
const REVIEW_ICON = require('../../../assets/icons/review.svg') as number;

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', icon: { kind: 'symbol', name: 'home' }, href: '/' },
  { key: 'quiz', label: 'Quiz', icon: { kind: 'image', source: QUIZ_ICON }, href: '/quiz' },
  { key: 'review', label: 'Review', icon: { kind: 'image', source: REVIEW_ICON }, href: '/review' },
  {
    key: 'settings',
    label: 'Settings',
    icon: { kind: 'symbol', name: 'settings' },
    href: '/settings',
  },
];

const HIDDEN_ON_PATHS = ['/quiz/session', '/review/session'];

const NAV_MAX_WIDTH = 560;
const MAX_FONT_SCALE = 1.3;

function getSectionForPath(pathname: string): NavKey | null {
  if (pathname === '/') return 'home';
  if (pathname === '/quiz' || pathname.startsWith('/quiz/')) return 'quiz';
  if (pathname === '/review' || pathname.startsWith('/review/')) return 'review';
  if (pathname === '/settings' || pathname.startsWith('/settings/')) return 'settings';
  return null;
}

function useKeyboardVisible() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => setIsVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setIsVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return isVisible;
}

export function BottomNav() {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);

  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isKeyboardVisible = useKeyboardVisible();

  if (isKeyboardVisible || HIDDEN_ON_PATHS.includes(pathname)) {
    return null;
  }

  const currentSection = getSectionForPath(pathname);

  const handleNavigate = (item: NavItem) => {
    if (item.key === currentSection) {
      if (pathname !== item.href) {
        router.replace(item.href);
      }
      return;
    }

    if (item.key === 'home') {
      router.dismissTo('/');
      return;
    }

    if (currentSection === 'home') {
      router.push(item.href);
      return;
    }

    router.replace(item.href);
  };

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, SPACING.sm) }]}
      accessibilityRole="tablist"
    >
      <View style={[styles.bar, { paddingLeft: insets.left, paddingRight: insets.right }]}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === currentSection;
          const iconColor = isActive ? colors.primary : colors.textMuted;

          return (
            <Pressable
              key={item.key}
              onPress={() => handleNavigate(item)}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isActive }}
              hitSlop={4}
              style={({ pressed }) => [styles.item, pressed && !isActive && styles.itemPressed]}
            >
              {({ pressed }) => (
                <>
                  <View
                    style={[
                      styles.iconWrap,
                      isActive && styles.iconWrapActive,
                      pressed && !isActive && styles.iconWrapPressed,
                    ]}
                  >
                    {item.icon.kind === 'image' ? (
                      <Image
                        source={item.icon.source}
                        style={styles.imageIcon}
                        contentFit="contain"
                        tintColor={iconColor}
                        accessible={false}
                      />
                    ) : (
                      <AppIcon name={item.icon.name} size={ICON_SIZES.lg} color={iconColor} />
                    )}
                  </View>
                  <Text
                    style={[styles.label, isActive && styles.labelActive]}
                    numberOfLines={1}
                    maxFontSizeMultiplier={MAX_FONT_SCALE}
                  >
                    {item.label}
                  </Text>
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  const barShadow = createShadow(8, colors.shadow, 0.06, 12, { width: 0, height: -4 });
  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      paddingTop: SPACING.sm - 2,
      ...barShadow,
    },
    bar: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: NAV_MAX_WIDTH,
      alignSelf: 'center',
    },
    item: {
      flex: 1,
      minWidth: 0,
      minHeight: 52,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      paddingHorizontal: SPACING.xs,
    },
    itemPressed: {
      opacity: 0.85,
    },
    iconWrap: {
      width: 52,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.round,
    },
    iconWrapActive: {
      backgroundColor: colors.surfaceMuted,
      borderRadius: BORDER_RADIUS.xs,
    },
    iconWrapPressed: {
      backgroundColor: colors.surfacePressed,
    },
    imageIcon: {
      width: ICON_SIZES.lg,
      height: ICON_SIZES.lg,
    },
    label: {
      fontSize: FONT_SIZES.xs,
      fontWeight: FONT_WEIGHTS.medium,
      color: colors.textMuted,
    },
    labelActive: {
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.primary,
    },
  });
}
