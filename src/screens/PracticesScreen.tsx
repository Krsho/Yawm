import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { PracticeRow } from '../components/PracticeRow';
import { SectionHeader } from '../components/SectionHeader';
import { Screen } from '../components/Screen';
import { fontSize, radius, spacing } from '../constants/theme';
import { practices } from '../data/mockData';
import { useTheme } from '../hooks/use-theme';
import { Practice } from '../types';
import { formatLongDate } from '../utils/date';

const FILTERS = ['All', 'Obligatory', 'Voluntary'];

const SECTIONS: { title: string; badge: string; tone: 'green' | 'beige'; items: Practice[] }[] = [
  {
    title: 'Obligatory Prayers',
    badge: 'Fard',
    tone: 'green',
    items: practices.filter((p) => p.type === 'obligatory'),
  },
  {
    title: 'Sunnah Prayers',
    badge: 'Voluntary',
    tone: 'beige',
    items: practices.filter((p) => p.type === 'voluntary' && p.category === 'prayer'),
  },
  {
    title: 'Daily Worship',
    badge: 'Voluntary',
    tone: 'beige',
    items: practices.filter((p) => p.type === 'voluntary' && p.category !== 'prayer'),
  },
];

interface PracticesScreenProps {
  onOpenPractice: (id: string) => void;
  onAddPractice: () => void;
}

export function PracticesScreen({ onOpenPractice, onAddPractice }: PracticesScreenProps) {
  const theme = useTheme();

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Daily Practices</Text>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={theme.textMuted} />
            <Text style={[styles.date, { color: theme.textMuted }]}>{formatLongDate(new Date())}</Text>
          </View>
        </View>
        <Pressable
          onPress={onAddPractice}
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          hitSlop={6}
        >
          <Ionicons name="add" size={26} color={theme.onPrimary} />
        </Pressable>
      </View>

      {/* Filter chips are static for now; "All" is shown as selected. */}
      <View style={styles.filters}>
        {FILTERS.map((filter, index) => {
          const isActive = index === 0;
          return (
            <View
              key={filter}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? theme.primary : theme.surface,
                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
            >
              <Text style={[styles.chipLabel, { color: isActive ? theme.onPrimary : theme.text }]}>
                {filter}
              </Text>
            </View>
          );
        })}
      </View>

      {SECTIONS.map((section) => (
        <View key={section.title}>
          <SectionHeader
            title={section.title}
            accessory={<Badge label={section.badge} tone={section.tone} />}
          />
          <Card style={styles.listCard}>
            {section.items.map((practice, index) => (
              <PracticeRow
                key={practice.id}
                practice={practice}
                showDivider={index < section.items.length - 1}
                onPress={() => onOpenPractice(practice.id)}
              />
            ))}
          </Card>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: '700',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  date: {
    fontSize: fontSize.small,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  chipLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  listCard: {
    paddingVertical: spacing.xs,
  },
});
