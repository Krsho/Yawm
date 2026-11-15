import { StyleSheet, Text, View } from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';
import { PracticeType } from '../types';

interface BadgeProps {
  label: string;
  tone?: 'green' | 'beige';
}

export function Badge({ label, tone = 'green' }: BadgeProps) {
  const theme = useTheme();
  const isBeige = tone === 'beige';
  const backgroundColor = isBeige ? theme.highlight : theme.primarySoft;
  const color = isBeige ? theme.accent : theme.primary;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

/** Badge that labels a practice as obligatory (Fard) or voluntary (Sunnah). */
export function PracticeTypeBadge({ type }: { type: PracticeType }) {
  return type === 'obligatory' ? (
    <Badge label="Obligatory" />
  ) : (
    <Badge label="Voluntary" tone="beige" />
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  label: {
    fontSize: fontSize.caption - 1,
    fontWeight: '600',
  },
});
