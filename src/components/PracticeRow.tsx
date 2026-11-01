import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '../theme';
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
  const isDashboard = variant === 'dashboard';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, showDivider && styles.divider, pressed && styles.pressed]}
    >
      <Checkbox checked={practice.completed} shape={isDashboard ? 'round' : 'square'} />
      <View style={styles.body}>
        <Text style={[styles.name, practice.completed && !isDashboard && styles.nameDone]}>
          {practice.name}
        </Text>
        {isDashboard && <PracticeTypeBadge type={practice.type} />}
      </View>
      <Text style={styles.meta}>{practiceMeta(practice)}</Text>
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
    borderBottomColor: colors.border,
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
    color: colors.text,
  },
  nameDone: {
    color: colors.textMuted,
  },
  meta: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
});
