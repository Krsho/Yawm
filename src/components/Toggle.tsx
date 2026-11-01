import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

/**
 * Static switch that looks the same on Android and iOS.
 * It becomes interactive once settings are stored in app state.
 */
export function Toggle({ value }: { value: boolean }) {
  return (
    <View style={[styles.track, value && styles.trackOn]}>
      <View style={[styles.thumb, value && styles.thumbOn]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 28,
    borderRadius: 14,
    padding: 3,
    backgroundColor: colors.border,
  },
  trackOn: {
    backgroundColor: colors.primary,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
});
