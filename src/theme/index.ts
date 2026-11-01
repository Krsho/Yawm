import { Platform } from 'react-native';

// Central design tokens. Every screen and component reads colours, spacing
// and type sizes from here so the look stays consistent across the app.

export const colors = {
  primary: '#1F4D3A', // deep forest green
  primaryDark: '#163829',
  primarySoft: '#E7EFE9', // sage tint for highlighted surfaces
  sage: '#8FAE98',
  background: '#F7F5EF', // warm off-white
  surface: '#FFFFFF',
  beige: '#F4EDDF',
  beigeBorder: '#E9DFC8',
  gold: '#B08D57',
  text: '#1C2621',
  textMuted: '#6E7872',
  textFaint: '#A3AAA5',
  border: '#E7E4DC',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
};

export const fonts = {
  // Serif face used for the "Yawm" wordmark and large headings.
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
};

export const fontSize = {
  caption: 11,
  small: 13,
  body: 15,
  title: 17,
  heading: 24,
  display: 32,
};

export const shadow = {
  shadowColor: '#1C2621',
  shadowOpacity: 0.05,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
};
