import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { HeaderBar } from '../components/HeaderBar';
import { Screen } from '../components/Screen';
import { colors, fontSize, radius, spacing } from '../theme';

interface AddPracticeScreenProps {
  onClose: () => void;
}

/**
 * Static layout of the Add / Edit Practice form.
 * Input state, validation and saving are added in Week 9, and the screen
 * becomes a modal route in Week 8.
 */
export function AddPracticeScreen({ onClose }: AddPracticeScreenProps) {
  return (
    <Screen header={<HeaderBar title="Add Practice" icon="close" onPress={onClose} />}>
      <Card style={styles.form}>
        <Field label="Practice Name" required>
          <TextInput
            style={styles.input}
            placeholder="e.g. Sunnah of Dhuhr"
            placeholderTextColor={colors.textFaint}
          />
        </Field>

        <Field label="Category" required>
          <SelectPlaceholder value="Prayer" />
        </Field>

        <Field label="Type" required>
          <View style={styles.segment}>
            <View style={[styles.segmentItem, styles.segmentActive]}>
              <Text style={[styles.segmentLabel, styles.segmentLabelActive]}>Obligatory</Text>
            </View>
            <View style={styles.segmentItem}>
              <Text style={styles.segmentLabel}>Voluntary</Text>
            </View>
          </View>
        </Field>

        <Field label="Tracking Type" required>
          <SelectPlaceholder value="Checkbox" />
        </Field>

        <Field label="Description (optional)">
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Add a short description…"
            placeholderTextColor={colors.textFaint}
            multiline
            textAlignVertical="top"
          />
        </Field>

        <View style={styles.checkboxRow}>
          <Checkbox checked size={20} />
          <Text style={styles.checkboxLabel}>Include in my daily routine</Text>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button label="Cancel" variant="outline" onPress={onClose} />
        <Button label="Save Practice" />
      </View>
    </Screen>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {children}
    </View>
  );
}

/** Looks like a dropdown; becomes a real picker together with the form logic. */
function SelectPlaceholder({ value }: { value: string }) {
  return (
    <View style={[styles.input, styles.select]}>
      <Text style={styles.selectValue}>{value}</Text>
      <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.lg,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.text,
  },
  required: {
    color: colors.gold,
  },
  input: {
    minHeight: 46,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    fontSize: fontSize.body,
    color: colors.text,
  },
  multiline: {
    minHeight: 90,
    paddingTop: spacing.md,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectValue: {
    fontSize: fontSize.body,
    color: colors.text,
  },
  segment: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.textMuted,
  },
  segmentLabelActive: {
    color: colors.white,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkboxLabel: {
    fontSize: fontSize.body,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
