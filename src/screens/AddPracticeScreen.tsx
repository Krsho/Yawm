import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { HeaderBar } from '../components/HeaderBar';
import { Screen } from '../components/Screen';
import { fontSize, radius, spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';

interface AddPracticeScreenProps {
  onClose: () => void;
}

/**
 * Static layout of the Add / Edit Practice form.
 * Input state, validation and saving are added in Week 9, and the screen
 * becomes a modal route in Week 8.
 */
export function AddPracticeScreen({ onClose }: AddPracticeScreenProps) {
  const theme = useTheme();
  const inputColors = {
    borderColor: theme.border,
    backgroundColor: theme.background,
    color: theme.text,
  };

  return (
    <Screen header={<HeaderBar title="Add Practice" icon="close" onPress={onClose} />}>
      <Card style={styles.form}>
        <Field label="Practice Name" required>
          <TextInput
            style={[styles.input, inputColors]}
            placeholder="e.g. Sunnah of Dhuhr"
            placeholderTextColor={theme.textFaint}
          />
        </Field>

        <Field label="Category" required>
          <SelectPlaceholder value="Prayer" />
        </Field>

        <Field label="Type" required>
          <View
            style={[
              styles.segment,
              { backgroundColor: theme.background, borderColor: theme.border },
            ]}
          >
            <View style={[styles.segmentItem, { backgroundColor: theme.primary }]}>
              <Text style={[styles.segmentLabel, { color: theme.onPrimary }]}>Obligatory</Text>
            </View>
            <View style={styles.segmentItem}>
              <Text style={[styles.segmentLabel, { color: theme.textMuted }]}>Voluntary</Text>
            </View>
          </View>
        </Field>

        <Field label="Tracking Type" required>
          <SelectPlaceholder value="Checkbox" />
        </Field>

        <Field label="Description (optional)">
          <TextInput
            style={[styles.input, inputColors, styles.multiline]}
            placeholder="Add a short description…"
            placeholderTextColor={theme.textFaint}
            multiline
            textAlignVertical="top"
          />
        </Field>

        <View style={styles.checkboxRow}>
          <Checkbox checked size={20} />
          <Text style={[styles.checkboxLabel, { color: theme.text }]}>
            Include in my daily routine
          </Text>
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
  const theme = useTheme();

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: theme.text }]}>
        {label}
        {required && <Text style={{ color: theme.accent }}> *</Text>}
      </Text>
      {children}
    </View>
  );
}

/** Looks like a dropdown; becomes a real picker together with the form logic. */
function SelectPlaceholder({ value }: { value: string }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.input,
        { borderColor: theme.border, backgroundColor: theme.background },
        styles.select,
      ]}
    >
      <Text style={[styles.selectValue, { color: theme.text }]}>{value}</Text>
      <Ionicons name="chevron-down" size={18} color={theme.textMuted} />
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
  },
  input: {
    minHeight: 46,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    fontSize: fontSize.body,
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
  },
  segment: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
  },
  segmentLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkboxLabel: {
    fontSize: fontSize.body,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
