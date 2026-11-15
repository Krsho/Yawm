import { StyleSheet, Text, View } from 'react-native';

import { fontSize, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';
import { Practice } from '../types';
import { countCompleted } from '../utils/practice';
import { Card } from './Card';

interface SummaryRowProps {
  practices: Practice[];
}

/** Three equal boxes with totals calculated from the practices during render. */
export function SummaryRow({ practices }: SummaryRowProps) {
  const theme = useTheme();
  const done = countCompleted(practices);
  const items = [
    { label: 'Practices', value: practices.length },
    { label: 'Done', value: done },
    { label: 'Left', value: practices.length - done },
  ];

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <Card key={item.label} style={styles.box}>
          <Text style={[styles.value, { color: theme.primary }]}>{item.value}</Text>
          <Text style={[styles.label, { color: theme.textMuted }]}>{item.label}</Text>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  value: {
    fontSize: fontSize.heading,
    fontWeight: '700',
  },
  label: {
    fontSize: fontSize.small,
  },
});
