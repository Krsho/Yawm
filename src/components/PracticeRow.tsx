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
}

export function PracticeRow({
  practice,
  variant = 'list',
  showDivider = false,
  onPress,
}: PracticeRowProps) {
  const theme = useTheme();
  const isDashboard = variant === 'dashboard';
  // Completed practices are greyed out in lists, but not on the dashboard.
  const nameColor = practice.completed && !isDashboard ? theme.textMuted : theme.text;

  return (
    <Pressable
      onPress={onPress}
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
