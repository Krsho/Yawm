import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

interface CheckboxProps {
  checked: boolean;
  /** Round checkboxes are used on the Today dashboard, square ones in lists. */
  shape?: 'round' | 'square';
  size?: number;
}

/** Visual-only checkbox. Toggling practices is added together with app state. */
export function Checkbox({ checked, shape = 'square', size = 22 }: CheckboxProps) {
  return (
    <View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderRadius: shape === 'round' ? size / 2 : 6,
        },
        checked && styles.checked,
      ]}
    >
      {checked && <Ionicons name="checkmark" size={size * 0.68} color={colors.white} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1.5,
    borderColor: colors.textFaint,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
