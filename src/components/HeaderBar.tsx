import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '../theme';

interface HeaderBarProps {
  title: string;
  icon?: 'back' | 'close';
  onPress?: () => void;
}

/** Top bar for secondary screens: a back (or close) button and a title. */
export function HeaderBar({ title, icon = 'back', onPress }: HeaderBarProps) {
  return (
    <View style={styles.bar}>
      <Pressable onPress={onPress} hitSlop={10} style={styles.button}>
        <Ionicons name={icon === 'back' ? 'arrow-back' : 'close'} size={24} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      {/* Spacer with the button's width keeps the title centred. */}
      <View style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  button: {
    width: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.title,
    fontWeight: '600',
    color: colors.text,
  },
});
