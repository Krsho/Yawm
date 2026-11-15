import { Platform } from 'react-native';

// Central design tokens. The colours exist twice, for light and dark mode,
// with the same role names in both; components read them through useTheme().
// Spacing, radius and type sizes are the same in both modes.

export const colors = {
  light: {
    primary: '#1F4D3A', // deep forest green
    onPrimary: '#FFFFFF', // text and icons on primary
    primarySoft: '#E7EFE9', // sage tint for highlighted surfaces
    onPrimarySoft: '#163829', // text on primarySoft
    primaryMuted: '#8FAE98',
    background: '#F7F5EF', // warm off-white
    surface: '#FFFFFF',
    highlight: '#F4EDDF', // Knowledge of the Day, voluntary badges
    highlightBorder: '#E9DFC8',
    accent: '#B08D57', // gold
    text: '#1C2621',
    textMuted: '#6E7872',
    textFaint: '#A3AAA5',
    border: '#E7E4DC',
    thumb: '#FFFFFF', // switch knob
  },
  dark: {
    primary: '#7CC29A',
    onPrimary: '#0F1613',
    primarySoft: '#1E2E25',
    onPrimarySoft: '#CDE6D5',
    primaryMuted: '#5E8F70',
    background: '#0F1613', // dark green-grey instead of pure black
    surface: '#18211C',
    highlight: '#2A2419',
    highlightBorder: '#3D3424',
    accent: '#D8B57C',
    text: '#ECF0ED',
    textMuted: '#A7B1AB',
    textFaint: '#7E8A83',
    border: '#2B3631',
    thumb: '#FFFFFF',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
} as const;

export const fonts = {
  // Serif face used for the "Yawm" wordmark and large headings.
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
} as const;

export const fontSize = {
  caption: 11,
  small: 13,
  body: 15,
  title: 17,
  heading: 24,
  display: 32,
} as const;

export const shadow = {
  shadowColor: '#1C2621',
  shadowOpacity: 0.05,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
} as const;
