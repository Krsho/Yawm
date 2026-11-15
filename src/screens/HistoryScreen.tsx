import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { ProgressBar } from '../components/Progress';
import { SectionHeader } from '../components/SectionHeader';
import { Screen } from '../components/Screen';
import { fontSize, spacing } from '../constants/theme';
import { previousDays } from '../data/mockData';
import { useTheme } from '../hooks/use-theme';
import { formatDayLabel, formatShortDate, getWeekDays, shortWeekday } from '../utils/date';

type DayStatus = 'done' | 'today' | 'upcoming';

function dayStatus(day: Date, today: Date): DayStatus {
  if (day.toDateString() === today.toDateString()) return 'today';
  return day < today ? 'done' : 'upcoming';
}

export function HistoryScreen() {
  const theme = useTheme();
  const today = new Date();
  const week = getWeekDays(today);
  // Sample weekly numbers until real records are stored on the device.
  const weekCompleted = 58;
  const weekTotal = 84;

  return (
    <Screen>
      <View>
        <Text style={[styles.title, { color: theme.text }]}>Your History</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Consistency is better than intensity
        </Text>
      </View>

      <Card style={styles.weekCard}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>This Week</Text>
        <View style={styles.weekSummary}>
          <Text style={[styles.weekCount, { color: theme.textMuted }]}>
            {weekCompleted} practices completed
          </Text>
          <Text style={[styles.weekPercent, { color: theme.primary }]}>
            {Math.round((weekCompleted / weekTotal) * 100)}%
          </Text>
        </View>
        <ProgressBar value={weekCompleted / weekTotal} />

        <View style={styles.days}>
          {week.map((day) => {
            const status = dayStatus(day, today);
            return (
              <View key={day.toDateString()} style={styles.day}>
                <Text
                  style={[
                    styles.dayLabel,
                    { color: status === 'today' ? theme.primary : theme.textMuted },
                    status === 'today' && styles.dayLabelToday,
                  ]}
                >
                  {shortWeekday(day)}
                </Text>
                <View
                  style={[
                    styles.dayDot,
                    { borderColor: status === 'upcoming' ? theme.border : theme.primary },
                    status === 'done' && { backgroundColor: theme.primary },
                  ]}
                >
                  {status === 'done' && (
                    <Ionicons name="checkmark" size={16} color={theme.onPrimary} />
                  )}
                  {status === 'today' && (
                    <View style={[styles.todayInner, { backgroundColor: theme.primaryMuted }]} />
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </Card>

      <View>
        <SectionHeader title="Previous Days" />
        <Card style={styles.listCard}>
          {previousDays.map((record, index) => (
            <View
              key={record.date.toDateString()}
              style={[
                styles.dayRow,
                { borderBottomColor: theme.border },
                index < previousDays.length - 1 && styles.divider,
              ]}
            >
              <View style={styles.dayRowText}>
                <Text style={[styles.dayRowTitle, { color: theme.text }]}>
                  {formatDayLabel(record.date, today)}
                </Text>
                <Text style={[styles.dayRowDate, { color: theme.textMuted }]}>
                  {formatShortDate(record.date)}
                </Text>
              </View>
              <Text style={[styles.dayRowCount, { color: theme.textMuted }]}>
                {record.completed} of {record.total} completed
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.heading,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.small,
  },
  weekCard: {
    gap: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
  },
  weekSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekCount: {
    fontSize: fontSize.small,
  },
  weekPercent: {
    fontSize: fontSize.small,
    fontWeight: '700',
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  day: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  dayLabel: {
    fontSize: fontSize.caption,
  },
  dayLabelToday: {
    fontWeight: '700',
  },
  dayDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  listCard: {
    paddingVertical: spacing.xs,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dayRowText: {
    flex: 1,
    gap: 2,
  },
  dayRowTitle: {
    fontSize: fontSize.body,
    fontWeight: '500',
  },
  dayRowDate: {
    fontSize: fontSize.caption,
  },
  dayRowCount: {
    fontSize: fontSize.small,
  },
});
