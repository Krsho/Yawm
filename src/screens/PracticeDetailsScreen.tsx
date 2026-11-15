import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { PracticeTypeBadge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderBar } from '../components/HeaderBar';
import { ProgressBar } from '../components/Progress';
import { Screen } from '../components/Screen';
import { fontSize, radius, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';
import { Practice, PracticeCategory } from '../types';
import { formatLongDate } from '../utils/date';
import { practiceMeta } from '../utils/practice';

const CATEGORY_ICONS: Record<PracticeCategory, ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  prayer: 'mosque',
  adhkar: 'hand-heart-outline',
  quran: 'book-open-variant',
  dua: 'hands-pray',
};

interface PracticeDetailsScreenProps {
  practice: Practice;
  onBack: () => void;
  onEdit: () => void;
}

export function PracticeDetailsScreen({ practice, onBack, onEdit }: PracticeDetailsScreenProps) {
  const theme = useTheme();
  // Must be a real boolean: with a target of 0, "&& practice.target" would render a bare 0 and crash.
  const isCount = practice.tracking === 'count' && (practice.target ?? 0) > 0;
  const inputColors = { borderColor: theme.border, backgroundColor: theme.surface };

  return (
    <Screen header={<HeaderBar title="Practice Details" onPress={onBack} />}>
      <Card
        style={[styles.hero, { backgroundColor: theme.primarySoft, borderColor: theme.primarySoft }]}
      >
        <View style={styles.heroTop}>
          <View style={[styles.iconCircle, { backgroundColor: theme.surface }]}>
            <MaterialCommunityIcons
              name={CATEGORY_ICONS[practice.category]}
              size={30}
              color={theme.primary}
            />
          </View>
          <View style={styles.heroText}>
            <Text style={[styles.name, { color: theme.text }]}>{practice.name}</Text>
            <PracticeTypeBadge type={practice.type} />
          </View>
        </View>

        <Text style={[styles.description, { color: theme.textMuted }]}>{practice.description}</Text>

        {isCount && (
          <View style={styles.countBlock}>
            <View style={styles.countRow}>
              <Text style={[styles.countLabel, { color: theme.textMuted }]}>Progress</Text>
              <Text style={[styles.countValue, { color: theme.primary }]}>{practiceMeta(practice)}</Text>
            </View>
            <ProgressBar value={practice.progress / (practice.target ?? 1)} />
          </View>
        )}

        <View
          style={[
            styles.status,
            { backgroundColor: practice.completed ? theme.surface : theme.background },
          ]}
        >
          <Ionicons
            name={practice.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={practice.completed ? theme.primary : theme.textFaint}
          />
          <Text style={[styles.statusLabel, { color: theme.text }]}>
            {practice.completed ? 'Completed today' : 'Not completed yet'}
          </Text>
        </View>
      </Card>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: theme.text }]}>Date</Text>
        <View style={[styles.input, inputColors]}>
          <Ionicons name="calendar-outline" size={18} color={theme.textMuted} />
          <Text style={[styles.inputText, { color: theme.text }]}>{formatLongDate(new Date())}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.fieldLabel, { color: theme.text }]}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, inputColors, styles.notes, { color: theme.text }]}
          placeholder="Add a note…"
          placeholderTextColor={theme.textFaint}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.actions}>
        <View style={styles.actionRow}>
          <Button label="Save Record" />
        </View>
        <View style={styles.actionRow}>
          <Button label="Edit Practice" variant="outline" icon="create-outline" onPress={onEdit} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.lg,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSize.heading,
    fontWeight: '700',
  },
  description: {
    fontSize: fontSize.body,
    lineHeight: 22,
  },
  countBlock: {
    gap: spacing.sm,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countLabel: {
    fontSize: fontSize.small,
  },
  countValue: {
    fontSize: fontSize.small,
    fontWeight: '700',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  statusLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  field: {
    gap: spacing.sm,
  },
  fieldLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  inputText: {
    fontSize: fontSize.body,
  },
  notes: {
    minHeight: 110,
    paddingTop: spacing.md,
    fontSize: fontSize.body,
  },
  actions: {
    gap: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
  },
});
