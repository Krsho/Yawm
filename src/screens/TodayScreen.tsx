import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { PracticeRow } from '../components/PracticeRow';
import { ProgressBar, ProgressRing } from '../components/Progress';
import { SectionHeader } from '../components/SectionHeader';
import { Screen } from '../components/Screen';
import { mockUser, practices, wordOfTheDay } from '../data/mockData';
import { colors, fonts, fontSize, spacing } from '../theme';
import { formatLongDate } from '../utils/date';
import { countCompleted } from '../utils/practice';

// Practices highlighted on the dashboard; the full list lives on the Practices tab.
const FEATURED_IDS = ['fajr', 'morning-adhkar', 'quran', 'maghrib'];

interface TodayScreenProps {
  onOpenSettings: () => void;
  onOpenPractice: (id: string) => void;
  onViewAllPractices: () => void;
  onOpenKnowledge: () => void;
}

export function TodayScreen({
  onOpenSettings,
  onOpenPractice,
  onViewAllPractices,
  onOpenKnowledge,
}: TodayScreenProps) {
  const completed = countCompleted(practices);
  const total = practices.length;
  const progress = completed / total;
  const featured = practices.filter((practice) => FEATURED_IDS.includes(practice.id));

  return (
    <Screen>
      <View style={styles.brandRow}>
        <View>
          <Text style={styles.brand}>Yawm</Text>
          <Text style={styles.tagline}>Your Daily Muslim Tracker</Text>
        </View>
        <Pressable onPress={onOpenSettings} hitSlop={10} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </Pressable>
      </View>

      <View>
        <Text style={styles.greeting}>Assalamu Alaikum, {mockUser.name}</Text>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.date}>{formatLongDate(new Date())}</Text>
        </View>
      </View>

      <Card style={styles.progressCard}>
        <View style={styles.ringWrapper}>
          <ProgressRing value={progress} />
          <Text style={styles.ringLabel}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={styles.progressBody}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <Text style={styles.progressSubtitle}>
            {completed} of {total} completed
          </Text>
          <ProgressBar value={progress} />
        </View>
      </Card>

      <View>
        <SectionHeader
          title="Today's Practices"
          actionLabel="View all"
          onAction={onViewAllPractices}
        />
        <Card style={styles.listCard}>
          {featured.map((practice, index) => (
            <PracticeRow
              key={practice.id}
              practice={practice}
              variant="dashboard"
              showDivider={index < featured.length - 1}
              onPress={() => onOpenPractice(practice.id)}
            />
          ))}
        </Card>
      </View>

      <Card tone="beige">
        <View style={styles.knowledgeHeader}>
          <Text style={styles.knowledgeTitle}>Knowledge of the Day</Text>
          <Ionicons name="book-outline" size={18} color={colors.gold} />
        </View>
        <View style={styles.wordRow}>
          <Text style={styles.arabicWord}>{wordOfTheDay.arabic}</Text>
          <View>
            <Text style={styles.transliteration}>{wordOfTheDay.transliteration}</Text>
            <Text style={styles.meaning}>{wordOfTheDay.meaning}</Text>
          </View>
        </View>
        <Pressable onPress={onOpenKnowledge} style={styles.readMore} hitSlop={8}>
          <Text style={styles.readMoreLabel}>Read more</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.primary} />
        </Pressable>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brand: {
    fontFamily: fonts.serif,
    fontSize: fontSize.display,
    fontWeight: '700',
    color: colors.primary,
  },
  tagline: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  settingsButton: {
    padding: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  greeting: {
    fontSize: fontSize.title + 2,
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
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  ringWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    position: 'absolute',
    fontSize: fontSize.caption,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBody: {
    flex: 1,
    gap: spacing.xs,
  },
  progressTitle: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  progressSubtitle: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  listCard: {
    paddingVertical: spacing.xs,
  },
  knowledgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  knowledgeTitle: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginVertical: spacing.lg,
  },
  arabicWord: {
    fontSize: 38,
    color: colors.primary,
    writingDirection: 'rtl',
  },
  transliteration: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
  },
  meaning: {
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: spacing.xs,
  },
  readMoreLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.primary,
  },
});
