import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontSize, radius, spacing } from '../theme';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'outline';
  icon?: ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
}

export function Button({ label, variant = 'primary', icon, onPress }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const textColor = isPrimary ? colors.white : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.outline,
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
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
});
