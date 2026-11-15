import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fontSize, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface SectionHeaderProps {
  title: string;
  /** Optional element next to the title, e.g. a badge. */
  accessory?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, accessory, actionLabel, onAction }: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {accessory}
      </View>
      {actionLabel && (
        <Pressable onPress={onAction} hitSlop={8} style={styles.action}>
          <Text style={[styles.actionLabel, { color: theme.textMuted }]}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color={theme.textMuted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '700',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  actionLabel: {
    fontSize: fontSize.small,
  },
});
