import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fontSize, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';
import { Practice } from '../types';
import { practiceMeta } from '../utils/practice';
import { PracticeTypeBadge } from './Badge';
import { Checkbox } from './Checkbox';

interface PracticeRowProps {
  practice: Practice;
  /** Dashboard rows show a round checkbox and the type badge. */
  variant?: 'dashboard' | 'list';
  showDivider?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function PracticeRow({
  practice,
  variant = 'list',
  showDivider = false,
  onPress,
  onLongPress,
}: PracticeRowProps) {
  const theme = useTheme();
  const isDashboard = variant === 'dashboard';
  // Completed practices are greyed out in lists, but not on the dashboard.
  const nameColor = practice.completed && !isDashboard ? theme.textMuted : theme.text;
  // What a screen reader says for the whole row, instead of reading each text separately.
  const accessibilityLabel = [
    practice.name,
    practice.type,
    practice.completed ? 'completed' : 'not completed',
    practiceMeta(practice),
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={onLongPress ? 'Long press to delete' : undefined}
      android_ripple={{ color: theme.border }}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: theme.border },
        showDivider && styles.divider,
        pressed && styles.pressed,
      ]}
    >
      <Checkbox checked={practice.completed} shape={isDashboard ? 'round' : 'square'} />
      <View style={styles.body}>
        <Text style={[styles.name, { color: nameColor }]}>{practice.name}</Text>
        {isDashboard && <PracticeTypeBadge type={practice.type} />}
      </View>
      <Text style={[styles.meta, { color: theme.textMuted }]}>{practiceMeta(practice)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressed: {
    opacity: 0.6,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: '500',
  },
  meta: {
    fontSize: fontSize.small,
    fontVariant: ['tabular-nums'],
  },
});
