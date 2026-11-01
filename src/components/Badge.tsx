import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '../theme';
import { PracticeType } from '../types';

interface BadgeProps {
  label: string;
  tone?: 'green' | 'beige';
}

export function Badge({ label, tone = 'green' }: BadgeProps) {
  return (
    <View style={[styles.badge, tone === 'beige' && styles.beige]}>
      <Text style={[styles.label, tone === 'beige' && styles.beigeLabel]}>{label}</Text>
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
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  beige: {
    backgroundColor: colors.beige,
  },
  label: {
    fontSize: fontSize.caption - 1,
    fontWeight: '600',
    color: colors.primary,
  },
  beigeLabel: {
    color: colors.gold,
  },
});
