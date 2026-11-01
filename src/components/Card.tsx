import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius, shadow, spacing } from '../theme';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** "beige" is used for the Knowledge of the Day highlight. */
  tone?: 'white' | 'beige';
}

export function Card({ children, style, tone = 'white' }: CardProps) {
  return <View style={[styles.card, tone === 'beige' && styles.beige, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadow,
  },
  beige: {
    backgroundColor: colors.beige,
    borderColor: colors.beigeBorder,
  },
});
