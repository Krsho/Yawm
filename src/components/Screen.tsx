import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface ScreenProps {
  children: ReactNode;
  /** Content pinned above the scrolling area, e.g. a back-button header. */
  header?: ReactNode;
}

/** Page wrapper: keeps content inside the safe area and makes it scrollable. */
export function Screen({ children, header }: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      {header}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  inner: {
    gap: spacing.xl,
    // Full width on phones; on tablets and wide windows the content stays readable and centred.
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
});
