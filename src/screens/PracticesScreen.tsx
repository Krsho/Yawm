import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { PracticeRow } from '../components/PracticeRow';
import { SectionHeader } from '../components/SectionHeader';
import { Screen } from '../components/Screen';
import { practices } from '../data/mockData';
import { colors, fontSize, radius, spacing } from '../theme';
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
  return (
    <Screen>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Daily Practices</Text>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
            <Text style={styles.date}>{formatLongDate(new Date())}</Text>
          </View>
        </View>
        <Pressable onPress={onAddPractice} style={styles.addButton} hitSlop={6}>
          <Ionicons name="add" size={26} color={colors.white} />
        </Pressable>
      </View>

      {/* Filter chips are static for now; "All" is shown as selected. */}
      <View style={styles.filters}>
        {FILTERS.map((filter, index) => (
          <View key={filter} style={[styles.chip, index === 0 && styles.chipActive]}>
            <Text style={[styles.chipLabel, index === 0 && styles.chipLabelActive]}>{filter}</Text>
          </View>
        ))}
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
    color: colors.text,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  date: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.text,
  },
  chipLabelActive: {
    color: colors.white,
  },
  listCard: {
    paddingVertical: spacing.xs,
  },
});
