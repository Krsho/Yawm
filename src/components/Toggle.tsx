import { StyleSheet, View } from 'react-native';

import { useTheme } from '../hooks/use-theme';

/**
 * Static switch that looks the same on Android and iOS.
 * It becomes interactive once settings are stored in app state.
 */
export function Toggle({ value }: { value: boolean }) {
  const theme = useTheme();

  return (
    <View style={[styles.track, { backgroundColor: value ? theme.primary : theme.border }]}>
      <View style={[styles.thumb, { backgroundColor: theme.thumb }, value && styles.thumbOn]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 28,
    borderRadius: 14,
    padding: 3,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
});
