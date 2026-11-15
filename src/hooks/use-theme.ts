import { useColorScheme } from 'react-native';

import { colors } from '@/constants/theme';

/** The colours for the phone's current mode, light or dark. */
export function useTheme() {
  const scheme = useColorScheme();
  return colors[scheme === 'dark' ? 'dark' : 'light'];
}
