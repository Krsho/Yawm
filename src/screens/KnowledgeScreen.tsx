import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { hadithOfTheDay, wordOfTheDay } from '../data/mockData';
import { colors, fontSize, radius, spacing } from '../theme';

export function KnowledgeScreen() {
  return (
    <Screen>
      <View>
        <Text style={styles.title}>Daily Knowledge</Text>
        <Text style={styles.subtitle}>A hadith and an Arabic word for today</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Hadith of the Day</Text>
          <Ionicons name="bookmark-outline" size={20} color={colors.primary} />
        </View>

        <View style={styles.arabicBox}>
          <Text style={styles.arabicText}>{hadithOfTheDay.arabic}</Text>
        </View>

        <Text style={styles.translation}>“{hadithOfTheDay.translation}”</Text>

        <View style={styles.sourceRow}>
          <View style={styles.sourceText}>
            <Text style={styles.sourceLabel}>Source</Text>
            <Text style={styles.sourceValue}>{hadithOfTheDay.source}</Text>
            <Text style={styles.narrator}>Narrated by {hadithOfTheDay.narrator}</Text>
          </View>
          <Badge label={hadithOfTheDay.grade} />
        </View>

        <View style={styles.buttonRow}>
          <Button label="Save Hadith" icon="bookmark-outline" />
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Arabic Word of the Day</Text>
          <Ionicons name="bookmark-outline" size={20} color={colors.primary} />
        </View>

        <View style={styles.wordBlock}>
          <Text style={styles.word}>{wordOfTheDay.arabic}</Text>
          <Text style={styles.transliteration}>{wordOfTheDay.transliteration}</Text>
          <Text style={styles.meaning}>{wordOfTheDay.meaning}</Text>
        </View>

        <View style={styles.exampleBox}>
          <Text style={styles.exampleLabel}>Example</Text>
          <Text style={styles.example}>{wordOfTheDay.example}</Text>
        </View>
      </Card>
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
    color: colors.text,
  },
  arabicBox: {
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 40,
    color: colors.primaryDark,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  translation: {
    fontSize: fontSize.body,
    lineHeight: 23,
    color: colors.text,
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
    color: colors.textFaint,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sourceValue: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.text,
  },
  narrator: {
    fontSize: fontSize.small,
    color: colors.textMuted,
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
    color: colors.primary,
  },
  transliteration: {
    fontSize: fontSize.title,
    fontWeight: '600',
    color: colors.text,
  },
  meaning: {
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
  exampleBox: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.beige,
  },
  exampleLabel: {
    fontSize: fontSize.caption,
    fontWeight: '700',
    color: colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  example: {
    fontSize: fontSize.small,
    lineHeight: 21,
    color: colors.text,
  },
});
