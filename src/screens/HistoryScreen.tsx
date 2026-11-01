import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { ProgressBar } from '../components/Progress';
import { SectionHeader } from '../components/SectionHeader';
import { Screen } from '../components/Screen';
import { previousDays } from '../data/mockData';
import { colors, fontSize, spacing } from '../theme';
import { formatDayLabel, formatShortDate, getWeekDays, shortWeekday } from '../utils/date';

type DayStatus = 'done' | 'today' | 'upcoming';

function dayStatus(day: Date, today: Date): DayStatus {
  if (day.toDateString() === today.toDateString()) return 'today';
  return day < today ? 'done' : 'upcoming';
}

export function HistoryScreen() {
  const today = new Date();
  const week = getWeekDays(today);
  // Sample weekly numbers until real records are stored on the device.
  const weekCompleted = 58;
  const weekTotal = 84;

  return (
    <Screen>
      <View>
        <Text style={styles.title}>Your History</Text>
        <Text style={styles.subtitle}>Consistency is better than intensity</Text>
      </View>

      <Card style={styles.weekCard}>
        <Text style={styles.cardTitle}>This Week</Text>
        <View style={styles.weekSummary}>
          <Text style={styles.weekCount}>{weekCompleted} practices completed</Text>
          <Text style={styles.weekPercent}>{Math.round((weekCompleted / weekTotal) * 100)}%</Text>
        </View>
        <ProgressBar value={weekCompleted / weekTotal} />

        <View style={styles.days}>
          {week.map((day) => {
            const status = dayStatus(day, today);
            return (
              <View key={day.toDateString()} style={styles.day}>
                <Text style={[styles.dayLabel, status === 'today' && styles.dayLabelToday]}>
                  {shortWeekday(day)}
                </Text>
                <View
                  style={[
                    styles.dayDot,
                    status === 'done' && styles.dayDotDone,
                    status === 'today' && styles.dayDotToday,
                  ]}
                >
                  {status === 'done' && <Ionicons name="checkmark" size={16} color={colors.white} />}
                  {status === 'today' && <View style={styles.todayInner} />}
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
              style={[styles.dayRow, index < previousDays.length - 1 && styles.divider]}
            >
              <View style={styles.dayRowText}>
                <Text style={styles.dayRowTitle}>{formatDayLabel(record.date, today)}</Text>
                <Text style={styles.dayRowDate}>{formatShortDate(record.date)}</Text>
              </View>
              <Text style={styles.dayRowCount}>
                {record.completed} of {record.total} completed
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
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
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  weekCard: {
    gap: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.text,
  },
  weekSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekCount: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  weekPercent: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.primary,
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
    color: colors.textMuted,
  },
  dayLabelToday: {
    color: colors.primary,
    fontWeight: '700',
  },
  dayDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayDotToday: {
    borderColor: colors.primary,
  },
  todayInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.sage,
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
    borderBottomColor: colors.border,
  },
  dayRowText: {
    flex: 1,
    gap: 2,
  },
  dayRowTitle: {
    fontSize: fontSize.body,
    fontWeight: '500',
    color: colors.text,
  },
  dayRowDate: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  dayRowCount: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
});
