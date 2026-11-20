import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@/hooks/use-theme';

/**
 * Root layout: every route in src/app is a screen in this Stack.
 * The screens draw their own headers, so the Stack header is hidden.
 */
export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          // Background behind the screens, so no white flash appears during the slide in dark mode.
          contentStyle: { backgroundColor: theme.background },
        }}
      />
    </>
  );
}
