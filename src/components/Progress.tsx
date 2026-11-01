import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { colors, radius } from '../theme';

interface ProgressProps {
  /** Value between 0 and 1. */
  value: number;
}

export function ProgressBar({ value }: ProgressProps) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.round(value * 100)}%` }]} />
    </View>
  );
}

interface ProgressRingProps extends ProgressProps {
  size?: number;
  strokeWidth?: number;
}

/** Circular progress drawn with two SVG circles: a grey track and a green arc. */
export function ProgressRing({ value, size = 52, strokeWidth = 6 }: ProgressRingProps) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={colors.primarySoft}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={colors.primary}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value)}
        // Start the arc at 12 o'clock instead of 3 o'clock.
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
});
