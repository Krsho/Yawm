import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderBar } from '../components/HeaderBar';
import { Screen } from '../components/Screen';
import { Toggle } from '../components/Toggle';
import { mockUser, routineSettings } from '../data/mockData';
import { colors, fontSize, radius, spacing } from '../theme';
import { RoutineSetting } from '../types';

const ROUTINE_ICONS: Record<RoutineSetting['icon'], ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  prayer: 'mosque',
  sunny: 'weather-sunset-up',
  moon: 'weather-night',
  book: 'book-open-variant',
  hand: 'hands-pray',
};

interface SettingsScreenProps {
  onBack: () => void;
  onManagePractices: () => void;
}

export function SettingsScreen({ onBack, onManagePractices }: SettingsScreenProps) {
  return (
    <Screen header={<HeaderBar title="Settings & Routine" onPress={onBack} />}>
      <View>
        <Text style={styles.sectionTitle}>My Daily Routine</Text>
        <Text style={styles.sectionHint}>Choose which practices appear in your daily checklist.</Text>
        <Card style={styles.listCard}>
          {routineSettings.map((setting, index) => (
            <Row key={setting.id} divider={index < routineSettings.length - 1}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name={ROUTINE_ICONS[setting.icon]} size={18} color={colors.primary} />
              </View>
              <Text style={styles.rowLabel}>{setting.label}</Text>
              <Toggle value={setting.enabled} />
            </Row>
          ))}
        </Card>
        <View style={styles.buttonRow}>
          <Button label="Manage Practices" variant="outline" onPress={onManagePractices} />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Reminders</Text>
        <Card style={styles.listCard}>
          <Row divider>
            <Text style={styles.rowLabel}>Enable Reminders</Text>
            <Toggle value />
          </Row>
          <Row>
            <Text style={styles.rowLabel}>Reminder Time</Text>
            <View style={styles.timePill}>
              <Text style={styles.timeText}>8:00 AM</Text>
              <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            </View>
          </Row>
        </Card>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Account</Text>
        <Card style={styles.listCard}>
          <Row divider>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>{mockUser.name[0]}</Text>
            </View>
            <View style={styles.accountText}>
              <Text style={styles.rowLabel}>{mockUser.email}</Text>
              <Text style={styles.accountHint}>Email address</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </Row>
          <Row>
            <View style={styles.iconBox}>
              <Ionicons name="log-out-outline" size={18} color={colors.primary} />
            </View>
            <Text style={styles.rowLabel}>Sign Out</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </Row>
        </Card>
      </View>

      <Text style={styles.version}>Yawm v1.0.0</Text>
    </Screen>
  );
}

function Row({ children, divider }: { children: ReactNode; divider?: boolean }) {
  return <View style={[styles.row, divider && styles.divider]}>{children}</View>;
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionHint: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  listCard: {
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.white,
  },
  accountText: {
    flex: 1,
  },
  accountHint: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  version: {
    textAlign: 'center',
    fontSize: fontSize.caption,
    color: colors.textFaint,
  },
});
