import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, useColorScheme } from 'react-native';

import { AppAlertProvider } from '@/components/ui/AppAlertProvider';
import { BottomNav } from '@/components/ui/BottomNav';
import { FONT_SIZES, SPACING, getColorsForScheme, type ThemeColors } from '@/constants/theme';
import { initializeDatabase } from '@/db/database';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { useThemedStyles } from '@/theme/useThemedStyles';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash may already be hidden after a fast refresh.
});

const SPLASH_LOGO = require('../../assets/images/splash-icon.png');

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    initializeDatabase()
      .then(() => setIsReady(true))
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Could not initialize the database.';
        setErrorMessage(message);
      });
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [isReady]);

  if (!isReady) {
    return <BootScreen errorMessage={errorMessage} />;
  }

  return (
    <ThemeProvider>
      <AppRoot />
    </ThemeProvider>
  );
}

type BootScreenProps = {
  errorMessage: string | null;
};

// Rendered before the database (and saved appearance preference) is available,
// so it follows the system color scheme.
function BootScreen({ errorMessage }: BootScreenProps) {
  const colors = getColorsForScheme(useColorScheme() === 'dark' ? 'dark' : 'light');
  const styles = createStyles(colors);

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Database error</Text>
        <Text style={styles.errorBody}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.splash}>
      <Image source={SPLASH_LOGO} style={styles.splashLogo} contentFit="contain" />
      <ActivityIndicator size="small" color={colors.primary} style={styles.splashSpinner} />
    </View>
  );
}

function AppRoot() {
  const styles = useThemedStyles(createStyles);

  return (
    <AppAlertProvider>
      <View style={styles.app}>
        <View style={styles.stackSlot}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: styles.stackScreen,
            }}
          />
        </View>
        <BottomNav />
      </View>
    </AppAlertProvider>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: colors.background,
    },
    stackSlot: {
      flex: 1,
      minHeight: 0,
    },
    stackScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: SPACING.lg,
    },
    splash: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: SPACING.xl,
    },
    splashLogo: {
      width: 200,
      height: 200,
    },
    splashSpinner: {
      marginTop: SPACING.lg,
    },
    errorTitle: {
      fontSize: FONT_SIZES.xxl,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    errorBody: {
      fontSize: FONT_SIZES.md,
      color: colors.textMuted,
      textAlign: 'center',
    },
  });
}
