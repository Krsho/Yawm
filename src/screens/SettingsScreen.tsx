import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderBar } from '../components/HeaderBar';
import { Screen } from '../components/Screen';
import { Toggle } from '../components/Toggle';
import { fontSize, radius, spacing } from '../constants/theme';
import { mockUser, routineSettings } from '../data/mockData';
import { useTheme } from '../hooks/use-theme';
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
  const theme = useTheme();
  const iconBoxColor = { backgroundColor: theme.primarySoft };

  return (
    <Screen header={<HeaderBar title="Settings & Routine" onPress={onBack} />}>
      <View>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>My Daily Routine</Text>
        <Text style={[styles.sectionHint, { color: theme.textMuted }]}>
          Choose which practices appear in your daily checklist.
        </Text>
        <Card style={styles.listCard}>
          {routineSettings.map((setting, index) => (
            <Row key={setting.id} divider={index < routineSettings.length - 1}>
              <View style={[styles.iconBox, iconBoxColor]}>
                <MaterialCommunityIcons name={ROUTINE_ICONS[setting.icon]} size={18} color={theme.primary} />
              </View>
              <Text style={[styles.rowLabel, { color: theme.text }]}>{setting.label}</Text>
              <Toggle value={setting.enabled} />
            </Row>
          ))}
        </Card>
        <View style={styles.buttonRow}>
          <Button label="Manage Practices" variant="outline" onPress={onManagePractices} />
        </View>
      </View>

      <View>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Reminders</Text>
        <Card style={styles.listCard}>
          <Row divider>
            <Text style={[styles.rowLabel, { color: theme.text }]}>Enable Reminders</Text>
            <Toggle value />
          </Row>
          <Row>
            <Text style={[styles.rowLabel, { color: theme.text }]}>Reminder Time</Text>
            <View style={[styles.timePill, { borderColor: theme.border }]}>
              <Text style={[styles.timeText, { color: theme.text }]}>8:00 AM</Text>
              <Ionicons name="time-outline" size={16} color={theme.textMuted} />
            </View>
          </Row>
        </Card>
      </View>

      <View>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>
        <Card style={styles.listCard}>
          <Row divider>
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <Text style={[styles.avatarLetter, { color: theme.onPrimary }]}>{mockUser.name[0]}</Text>
            </View>
            <View style={styles.accountText}>
              <Text style={[styles.rowLabel, { color: theme.text }]}>{mockUser.email}</Text>
              <Text style={[styles.accountHint, { color: theme.textMuted }]}>Email address</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
          </Row>
          <Row>
            <View style={[styles.iconBox, iconBoxColor]}>
              <Ionicons name="log-out-outline" size={18} color={theme.primary} />
            </View>
            <Text style={[styles.rowLabel, { color: theme.text }]}>Sign Out</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
          </Row>
        </Card>
      </View>

      <Text style={[styles.version, { color: theme.textFaint }]}>Yawm v1.0.0</Text>
    </Screen>
  );
}

function Row({ children, divider }: { children: ReactNode; divider?: boolean }) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: theme.border }, divider && styles.divider]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  sectionHint: {
    fontSize: fontSize.small,
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
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: fontSize.body,
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
  },
  timeText: {
    fontSize: fontSize.small,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: fontSize.title,
    fontWeight: '700',
  },
  accountText: {
    flex: 1,
  },
  accountHint: {
    fontSize: fontSize.caption,
  },
  version: {
    textAlign: 'center',
    fontSize: fontSize.caption,
  },
});
