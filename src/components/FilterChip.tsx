import { Pressable, StyleSheet, Text } from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

/** One option in a row of chips; the selected chip is filled with the primary colour. */
export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.primary : theme.surface,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
    >
      <Text style={[styles.label, { color: selected ? theme.onPrimary : theme.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  label: {
    fontSize: fontSize.small,
    fontWeight: '600',
  },
});
