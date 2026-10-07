import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { type ThemeColors, FONT_SIZES, FONT_WEIGHTS, SPACING } from '@/constants/theme';
import { useThemedStyles } from '@/theme/useThemedStyles';

type StyledTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
};

function useStyledTextStyles() {
  return useThemedStyles(createStyles);
}

export function Heading({ children, style, ...props }: StyledTextProps) {
  const styles = useStyledTextStyles();

  return (
    <Text style={[styles.heading, style]} {...props}>
      {children}
    </Text>
  );
}

export function Subheading({ children, style, ...props }: StyledTextProps) {
  const styles = useStyledTextStyles();

  return (
    <Text style={[styles.subheading, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyText({ children, style, ...props }: StyledTextProps) {
  const styles = useStyledTextStyles();

  return (
    <Text style={[styles.body, style]} {...props}>
      {children}
    </Text>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    heading: {
      fontSize: FONT_SIZES.hero,
      fontWeight: FONT_WEIGHTS.extraBold,
      color: colors.textDark,
      letterSpacing: -0.6,
    },
    subheading: {
      fontSize: FONT_SIZES.xxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
    },
    body: {
      fontSize: FONT_SIZES.md,
      color: colors.textMuted,
    },
  });
}

export const styledTextSpacing = {
  subtitle: {
    marginTop: SPACING.xs,
  },
  sectionDescription: {
    marginTop: 3,
  },
} as const;
