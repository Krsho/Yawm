import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontSize, spacing } from '../theme';

export type TabName = 'today' | 'practices' | 'knowledge' | 'history';

type IconName = ComponentProps<typeof Ionicons>['name'];

const TABS: { name: TabName; label: string; icon: IconName; activeIcon: IconName }[] = [
  { name: 'today', label: 'Today', icon: 'home-outline', activeIcon: 'home' },
  { name: 'practices', label: 'Practices', icon: 'list-outline', activeIcon: 'list' },
  { name: 'knowledge', label: 'Knowledge', icon: 'book-outline', activeIcon: 'book' },
  { name: 'history', label: 'History', icon: 'time-outline', activeIcon: 'time' },
];

interface BottomTabBarProps {
  active: TabName;
  onSelect: (tab: TabName) => void;
}

/**
 * Temporary bottom navigation for previewing the static screens.
 * It will be replaced by Expo Router tabs in Week 8.
 */
export function BottomTabBar({ active, onSelect }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      {TABS.map((tab) => {
        const isActive = tab.name === active;
        const color = isActive ? colors.primary : colors.textFaint;
        return (
          <Pressable key={tab.name} style={styles.tab} onPress={() => onSelect(tab.name)}>
            <Ionicons name={isActive ? tab.activeIcon : tab.icon} size={23} color={color} />
            <Text style={[styles.label, { color }, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  label: {
    fontSize: fontSize.caption,
  },
  labelActive: {
    fontWeight: '700',
  },
});
