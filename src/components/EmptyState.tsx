import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontSize, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface EmptyStateProps {
  title: string;
  message: string;
  /** Optional action below the message, e.g. a "Try again" button. */
  children?: ReactNode;
}

/** Centred title and message shown instead of a list that has nothing to show. */
export function EmptyState({ title, message, children }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: fontSize.body,
    textAlign: 'center',
  },
});
