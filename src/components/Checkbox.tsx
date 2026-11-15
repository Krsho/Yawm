import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../hooks/use-theme';

interface CheckboxProps {
  checked: boolean;
  /** Round checkboxes are used on the Today dashboard, square ones in lists. */
  shape?: 'round' | 'square';
  size?: number;
}

/** Visual-only checkbox. Toggling practices is added together with app state. */
export function Checkbox({ checked, shape = 'square', size = 22 }: CheckboxProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderRadius: shape === 'round' ? size / 2 : 6,
        },
        {
          borderColor: checked ? theme.primary : theme.textFaint,
          backgroundColor: checked ? theme.primary : theme.surface,
        },
      ]}
    >
      {checked && <Ionicons name="checkmark" size={size * 0.68} color={theme.onPrimary} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
