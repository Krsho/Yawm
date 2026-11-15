import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { PracticeRow } from '../components/PracticeRow';
import { ProgressBar, ProgressRing } from '../components/Progress';
import { SectionHeader } from '../components/SectionHeader';
import { Screen } from '../components/Screen';
import { fonts, fontSize, spacing } from '../constants/theme';
import { mockUser, practices, wordOfTheDay } from '../data/mockData';
import { useTheme } from '../hooks/use-theme';
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
  const theme = useTheme();
  const completed = countCompleted(practices);
  const total = practices.length;
  const progress = completed / total;
  const featured = practices.filter((practice) => FEATURED_IDS.includes(practice.id));

  return (
    <Screen>
      <View style={styles.brandRow}>
        <View>
          <Text style={[styles.brand, { color: theme.primary }]}>Yawm</Text>
          <Text style={[styles.tagline, { color: theme.textMuted }]}>Your Daily Muslim Tracker</Text>
        </View>
        <Pressable
          onPress={onOpenSettings}
          hitSlop={10}
          style={[styles.settingsButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Ionicons name="settings-outline" size={22} color={theme.text} />
        </Pressable>
      </View>

      <View>
        <Text style={[styles.greeting, { color: theme.text }]}>Assalamu Alaikum, {mockUser.name}</Text>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color={theme.textMuted} />
          <Text style={[styles.date, { color: theme.textMuted }]}>{formatLongDate(new Date())}</Text>
        </View>
      </View>

      <Card style={styles.progressCard}>
        <View style={styles.ringWrapper}>
          <ProgressRing value={progress} />
          <Text style={[styles.ringLabel, { color: theme.primary }]}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
        <View style={styles.progressBody}>
          <Text style={[styles.progressTitle, { color: theme.text }]}>{"Today's Progress"}</Text>
          <Text style={[styles.progressSubtitle, { color: theme.textMuted }]}>
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
          <Text style={[styles.knowledgeTitle, { color: theme.text }]}>Knowledge of the Day</Text>
          <Ionicons name="book-outline" size={18} color={theme.accent} />
        </View>
        <View style={styles.wordRow}>
          <Text style={[styles.arabicWord, { color: theme.primary }]}>{wordOfTheDay.arabic}</Text>
          <View>
            <Text style={[styles.transliteration, { color: theme.text }]}>
              {wordOfTheDay.transliteration}
            </Text>
            <Text style={[styles.meaning, { color: theme.textMuted }]}>{wordOfTheDay.meaning}</Text>
          </View>
        </View>
        <Pressable onPress={onOpenKnowledge} style={styles.readMore} hitSlop={8}>
          <Text style={[styles.readMoreLabel, { color: theme.primary }]}>Read more</Text>
          <Ionicons name="arrow-forward" size={15} color={theme.primary} />
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
  },
  tagline: {
    fontSize: fontSize.small,
  },
  settingsButton: {
    padding: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  greeting: {
    fontSize: fontSize.title + 2,
    fontWeight: '700',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  date: {
    fontSize: fontSize.small,
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
  },
  progressBody: {
    flex: 1,
    gap: spacing.xs,
  },
  progressTitle: {
    fontSize: fontSize.body,
    fontWeight: '700',
  },
  progressSubtitle: {
    fontSize: fontSize.small,
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
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginVertical: spacing.lg,
  },
  arabicWord: {
    fontSize: 38,
    writingDirection: 'rtl',
  },
  transliteration: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  meaning: {
    fontSize: fontSize.small,
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
  },
});
