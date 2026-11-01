import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { PracticeTypeBadge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderBar } from '../components/HeaderBar';
import { ProgressBar } from '../components/Progress';
import { Screen } from '../components/Screen';
import { colors, fontSize, radius, spacing } from '../theme';
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
  const isCount = practice.tracking === 'count' && practice.target;

  return (
    <Screen header={<HeaderBar title="Practice Details" onPress={onBack} />}>
      <Card style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={CATEGORY_ICONS[practice.category]}
              size={30}
              color={colors.primary}
            />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.name}>{practice.name}</Text>
            <PracticeTypeBadge type={practice.type} />
          </View>
        </View>

        <Text style={styles.description}>{practice.description}</Text>

        {isCount && (
          <View style={styles.countBlock}>
            <View style={styles.countRow}>
              <Text style={styles.countLabel}>Progress</Text>
              <Text style={styles.countValue}>{practiceMeta(practice)}</Text>
            </View>
            <ProgressBar value={practice.progress / (practice.target ?? 1)} />
          </View>
        )}

        <View style={[styles.status, !practice.completed && styles.statusPending]}>
          <Ionicons
            name={practice.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={practice.completed ? colors.primary : colors.textFaint}
          />
          <Text style={styles.statusLabel}>
            {practice.completed ? 'Completed today' : 'Not completed yet'}
          </Text>
        </View>
      </Card>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Date</Text>
        <View style={styles.input}>
          <Ionicons name="calendar-outline" size={18} color={colors.textMuted} />
          <Text style={styles.inputText}>{formatLongDate(new Date())}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.notes]}
          placeholder="Add a note…"
          placeholderTextColor={colors.textFaint}
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
    backgroundColor: colors.primarySoft,
    borderColor: colors.primarySoft,
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
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSize.heading,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: fontSize.body,
    lineHeight: 22,
    color: colors.textMuted,
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
    color: colors.textMuted,
  },
  countValue: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.primary,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  statusPending: {
    backgroundColor: colors.background,
  },
  statusLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
  },
  field: {
    gap: spacing.sm,
  },
  fieldLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  inputText: {
    fontSize: fontSize.body,
    color: colors.text,
  },
  notes: {
    minHeight: 110,
    paddingTop: spacing.md,
    fontSize: fontSize.body,
    color: colors.text,
  },
  actions: {
    gap: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
  },
});
