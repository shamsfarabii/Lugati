export type ColorScheme = 'light' | 'dark';

export const APPEARANCE_PREFERENCES = ['system', 'light', 'dark'] as const;

export type AppearancePreference = (typeof APPEARANCE_PREFERENCES)[number];

export type ThemeColors = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textDark: string;
  textMuted: string;
  textMutedSecondary: string;
  textOnPrimary: string;
  textOnDarkCard: string;
  textOnDarkCardMuted: string;
  border: string;
  borderLight: string;
  surfaceMuted: string;
  surfaceProfile: string;
  surfaceWordIcon: string;
  surfacePressed: string;
  surfaceAddButton: string;
  surfaceAddButtonPressed: string;
  addButtonBorder: string;
  wordIconText: string;
  chevron: string;
  arabicWord: string;
  danger: string;
  surfaceDanger: string;
  borderDanger: string;
  surfaceSuccess: string;
  borderSuccess: string;
  decorationOverlay: string;
  heroIconChip: string;
  heroLinkSurface: string;
  heroDivider: string;
  surfaceInput: string;
  inputFocusBorder: string;
  inputFocusHalo: string;
  imageScrim: string;
  shadow: string;
};

export const LIGHT_COLORS: ThemeColors = {
  primary: '#28744E',
  primaryDark: '#193D2E',
  primaryLight: '#276749',
  secondary: '#D4E5DA',
  accent: '#18392B',
  background: '#F7F8F3',
  card: '#FFFFFF',
  text: '#21352A',
  textDark: '#18392B',
  textMuted: '#768178',
  textMutedSecondary: '#7A857D',
  textOnPrimary: '#FFFFFF',
  textOnDarkCard: '#D4E5DA',
  textOnDarkCardMuted: '#B8CEC0',
  border: '#EAEEE9',
  borderLight: '#EEF1ED',
  surfaceMuted: '#EDF5EF',
  surfaceProfile: '#E2EEE6',
  surfaceWordIcon: '#EFF4F0',
  surfacePressed: '#F4F8F5',
  surfaceAddButton: '#F1F7F3',
  surfaceAddButtonPressed: '#E7F2EB',
  addButtonBorder: '#A8C4B2',
  wordIconText: '#678071',
  chevron: '#A6AFA9',
  arabicWord: '#20372A',
  danger: '#B3261E',
  surfaceDanger: '#FDECEA',
  borderDanger: '#E7B9B4',
  surfaceSuccess: '#E7F2EB',
  borderSuccess: '#A8C4B2',
  decorationOverlay: 'rgba(255,255,255,0.08)',
  heroIconChip: 'rgba(255,255,255,0.14)',
  heroLinkSurface: 'rgba(255,255,255,0.10)',
  heroDivider: 'rgba(255,255,255,0.18)',
  surfaceInput: '#FBFCFA',
  inputFocusBorder: '#28744E',
  inputFocusHalo: 'rgba(40, 116, 78, 0.10)',
  imageScrim: 'rgba(24, 57, 43, 0.55)',
  shadow: '#18392B',
};

export const DARK_COLORS: ThemeColors = {
  primary: '#3D9B73',
  primaryDark: '#142820',
  primaryLight: '#4AAF82',
  secondary: '#2A3D32',
  accent: '#0A0F0C',
  background: '#0E1411',
  card: '#171F1B',
  text: '#E6EBE8',
  textDark: '#F2F6F3',
  textMuted: '#8A968F',
  textMutedSecondary: '#7A877F',
  textOnPrimary: '#FFFFFF',
  textOnDarkCard: '#D4E5DA',
  textOnDarkCardMuted: '#9FB5A8',
  border: '#2A332E',
  borderLight: '#222B27',
  surfaceMuted: '#1E2823',
  surfaceProfile: '#243029',
  surfaceWordIcon: '#222C27',
  surfacePressed: '#252F2A',
  surfaceAddButton: '#1C2621',
  surfaceAddButtonPressed: '#28332D',
  addButtonBorder: '#3D5C4A',
  wordIconText: '#9AABA2',
  chevron: '#6B756F',
  arabicWord: '#DCE5DF',
  danger: '#F2B8B5',
  surfaceDanger: '#3A2220',
  borderDanger: '#6E4541',
  surfaceSuccess: '#1A2E24',
  borderSuccess: '#3D5C4A',
  decorationOverlay: 'rgba(255,255,255,0.06)',
  heroIconChip: 'rgba(255,255,255,0.14)',
  heroLinkSurface: 'rgba(255,255,255,0.10)',
  heroDivider: 'rgba(255,255,255,0.18)',
  surfaceInput: '#1A221E',
  inputFocusBorder: '#3D9B73',
  inputFocusHalo: 'rgba(61, 155, 115, 0.22)',
  imageScrim: 'rgba(0, 0, 0, 0.62)',
  shadow: '#000000',
};

export function getColorsForScheme(scheme: ColorScheme): ThemeColors {
  return scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 30,
  section: 32,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 15,
  xl: 16,
  xxl: 17,
  xxxl: 20,
  display: 24,
  hero: 28,
  stat: 42,
  decoration: 64,
} as const;

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extraBold: '800',
} as const;

export const BORDER_RADIUS = {
  xs: 4,
  sm: 12,
  md: 15,
  lg: 16,
  xl: 18,
  xxl: 20,
  card: 22,
  hero: 24,
  round: 9999,
} as const;

export const SIZES = {
  profile: 44,
  practiceIcon: 46,
  primaryButtonHeight: 50,
  addButtonHeight: 56,
  wordRowMinHeight: 70,
  wordIcon: 34,
  vocabularyCardMinHeight: 150,
  headerIconButton: 40,
  quizOptionMinHeight: 58,
  quizOptionBadge: 30,
  quizTimerTrackHeight: 6,
  iconButton: 32,
  stepBadge: 24,
  imagePreviewHeight: 200,
} as const;

export const ICON_SIZES = {
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
  xxl: 26,
} as const;
