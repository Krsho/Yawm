import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { radius, shadow, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** "beige" is used for the Knowledge of the Day highlight. */
  tone?: 'white' | 'beige';
}

export function Card({ children, style, tone = 'white' }: CardProps) {
  const theme = useTheme();
  const isBeige = tone === 'beige';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isBeige ? theme.highlight : theme.surface,
          borderColor: isBeige ? theme.highlightBorder : theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    ...shadow,
  },
});
