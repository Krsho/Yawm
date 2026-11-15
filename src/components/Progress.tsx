import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { radius } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface ProgressProps {
  /** Value between 0 and 1. */
  value: number;
}

export function ProgressBar({ value }: ProgressProps) {
  const theme = useTheme();

  return (
    <View style={[styles.track, { backgroundColor: theme.primarySoft }]}>
      <View
        style={[
          styles.fill,
          { backgroundColor: theme.primary },
          { width: `${Math.round(value * 100)}%` },
        ]}
      />
    </View>
  );
}

interface ProgressRingProps extends ProgressProps {
  size?: number;
  strokeWidth?: number;
}

/** Circular progress drawn with two SVG circles: a grey track and a green arc. */
export function ProgressRing({ value, size = 52, strokeWidth = 6 }: ProgressRingProps) {
  const theme = useTheme();
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={theme.primarySoft}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={theme.primary}
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
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
