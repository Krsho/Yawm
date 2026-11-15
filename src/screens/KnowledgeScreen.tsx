import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { fontSize, radius, spacing } from '../constants/theme';
import { hadithOfTheDay, wordOfTheDay } from '../data/mockData';
import { useTheme } from '../hooks/use-theme';

export function KnowledgeScreen() {
  const theme = useTheme();

  return (
    <Screen>
      <View>
        <Text style={[styles.title, { color: theme.text }]}>Daily Knowledge</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          A hadith and an Arabic word for today
        </Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Hadith of the Day</Text>
          <Ionicons name="bookmark-outline" size={20} color={theme.primary} />
        </View>

        <View style={[styles.arabicBox, { backgroundColor: theme.primarySoft }]}>
          <Text style={[styles.arabicText, { color: theme.onPrimarySoft }]}>
            {hadithOfTheDay.arabic}
          </Text>
        </View>

        <Text style={[styles.translation, { color: theme.text }]}>
          “{hadithOfTheDay.translation}”
        </Text>

        <View style={styles.sourceRow}>
          <View style={styles.sourceText}>
            <Text style={[styles.sourceLabel, { color: theme.textFaint }]}>Source</Text>
            <Text style={[styles.sourceValue, { color: theme.text }]}>{hadithOfTheDay.source}</Text>
            <Text style={[styles.narrator, { color: theme.textMuted }]}>
              Narrated by {hadithOfTheDay.narrator}
            </Text>
          </View>
          <Badge label={hadithOfTheDay.grade} />
        </View>

        <View style={styles.buttonRow}>
          <Button label="Save Hadith" icon="bookmark-outline" />
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Arabic Word of the Day</Text>
          <Ionicons name="bookmark-outline" size={20} color={theme.primary} />
        </View>

        <View style={styles.wordBlock}>
          <Text style={[styles.word, { color: theme.primary }]}>{wordOfTheDay.arabic}</Text>
          <Text style={[styles.transliteration, { color: theme.text }]}>
            {wordOfTheDay.transliteration}
          </Text>
          <Text style={[styles.meaning, { color: theme.textMuted }]}>{wordOfTheDay.meaning}</Text>
        </View>

        <View style={[styles.exampleBox, { backgroundColor: theme.highlight }]}>
          <Text style={[styles.exampleLabel, { color: theme.accent }]}>Example</Text>
          <Text style={[styles.example, { color: theme.text }]}>{wordOfTheDay.example}</Text>
        </View>
      </Card>
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
  card: {
    gap: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
  },
  arabicBox: {
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 40,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  translation: {
    fontSize: fontSize.body,
    lineHeight: 23,
    fontStyle: 'italic',
  },
  sourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sourceText: {
    gap: 2,
  },
  sourceLabel: {
    fontSize: fontSize.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sourceValue: {
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  narrator: {
    fontSize: fontSize.small,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  wordBlock: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  word: {
    fontSize: 44,
    lineHeight: 64,
  },
  transliteration: {
    fontSize: fontSize.title,
    fontWeight: '600',
  },
  meaning: {
    fontSize: fontSize.body,
  },
  exampleBox: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  exampleLabel: {
    fontSize: fontSize.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  example: {
    fontSize: fontSize.small,
    lineHeight: 21,
  },
});
