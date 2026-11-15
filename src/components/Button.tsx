import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { fontSize, radius, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'outline';
  icon?: ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
}

export function Button({ label, variant = 'primary', icon, onPress }: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const textColor = isPrimary ? theme.onPrimary : theme.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary
          ? { backgroundColor: theme.primary }
          : [styles.outline, { backgroundColor: theme.surface, borderColor: theme.primary }],
        pressed && styles.pressed,
      ]}
    >
      {icon && <Ionicons name={icon} size={17} color={textColor} />}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  outline: {
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
});
