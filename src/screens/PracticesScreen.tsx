import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { FilterChip } from '../components/FilterChip';
import { PracticeRow } from '../components/PracticeRow';
import { SectionHeader } from '../components/SectionHeader';
import { SummaryRow } from '../components/SummaryRow';
import { fontSize, radius, spacing } from '../constants/theme';
import { fetchPractices } from '../data/api';
import { useTheme } from '../hooks/use-theme';
import { Practice, PracticeType } from '../types';
import { formatLongDate } from '../utils/date';
import { groupPractices } from '../utils/practice';

type Filter = 'all' | PracticeType;
type Sort = 'default' | 'name' | 'todo';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'obligatory', label: 'Obligatory' },
  { value: 'voluntary', label: 'Voluntary' },
];

const SORTS: { value: Sort; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'name', label: 'A–Z' },
  { value: 'todo', label: 'To do first' },
];

interface PracticesScreenProps {
  onOpenPractice: (id: string) => void;
  onAddPractice: () => void;
}

export function PracticesScreen({ onOpenPractice, onAddPractice }: PracticesScreenProps) {
  const theme = useTheme();
  const [practices, setPractices] = useState<Practice[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('default');

  // Load the practices when the screen opens, and again after "Try again".
  useEffect(() => {
    let ignore = false;
    fetchPractices()
      .then((data) => {
        if (!ignore) {
          setPractices(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error');
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setAttempt((a) => a + 1);
  }

  // Pull-to-refresh: the old list stays visible under the spinner.
  async function refresh() {
    setRefreshing(true);
    try {
      setPractices(await fetchPractices());
    } catch {
      // Keep the old list if the refresh fails.
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(practice: Practice) {
    Alert.alert('Delete practice?', `"${practice.name}" will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setPractices((list) => list.filter((p) => p.id !== practice.id)),
      },
    ]);
  }

  // Derived values: calculated during render from state, never stored in state.
  const visible = filter === 'all' ? practices : practices.filter((p) => p.type === filter);
  let sorted = visible;
  if (sort === 'name') sorted = [...visible].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'todo') sorted = [...visible].sort((a, b) => Number(a.completed) - Number(b.completed));
  const sections = groupPractices(sorted);

  if (status !== 'ready') {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={['top', 'left', 'right']}
      >
        {status === 'loading' ? (
          <ActivityIndicator style={styles.loading} size="large" color={theme.primary} />
        ) : (
          <EmptyState title="Could not load practices" message="Check your connection and try again.">
            <View style={styles.retryRow}>
              <Button label="Try again" onPress={retry} />
            </View>
          </EmptyState>
        )}
      </SafeAreaView>
    );
  }

  const listHeader = (
    <View style={styles.listHeader}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Daily Practices</Text>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={theme.textMuted} />
            <Text style={[styles.date, { color: theme.textMuted }]}>{formatLongDate(new Date())}</Text>
          </View>
        </View>
        <Pressable
          onPress={onAddPractice}
          accessibilityRole="button"
          accessibilityLabel="Add practice"
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          hitSlop={6}
        >
          <Ionicons name="add" size={26} color={theme.onPrimary} />
        </Pressable>
      </View>

      <SummaryRow practices={practices} />

      <View style={styles.chipGroups}>
        <View style={styles.chips}>
          {FILTERS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={filter === option.value}
              onPress={() => setFilter(option.value)}
            />
          ))}
        </View>
        <View style={styles.chips}>
          {SORTS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={sort === option.value}
              onPress={() => setSort(option.value)}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <SectionList
        sections={sections}
        keyExtractor={(practice) => practice.id}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <EmptyState
            title={filter === 'all' ? 'No practices yet' : `No ${filter} practices`}
            message={filter === 'all' ? 'Tap + to add your first practice.' : 'Choose another filter.'}
          />
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <SectionHeader
              title={section.title}
              accessory={<Badge label={section.badge} tone={section.tone} />}
            />
          </View>
        )}
        renderItem={({ item, index, section }) => {
          const isLast = index === section.data.length - 1;
          // Each row draws its part of the card: the first row the top, the last row the bottom.
          return (
            <View
              style={[
                styles.rowCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
                index === 0 && styles.firstRow,
                isLast && styles.lastRow,
              ]}
            >
              <PracticeRow
                practice={item}
                showDivider={!isLast}
                onPress={() => onOpenPractice(item.id)}
                onLongPress={() => confirmDelete(item)}
              />
            </View>
          );
        }}
        stickySectionHeadersEnabled={false}
        refreshing={refreshing}
        onRefresh={refresh}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  retryRow: {
    flexDirection: 'row',
    width: 200,
    marginTop: spacing.md,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  listHeader: {
    gap: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.heading,
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipGroups: {
    gap: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sectionHeader: {
    paddingTop: spacing.xl,
  },
  rowCard: {
    paddingHorizontal: spacing.lg,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  firstRow: {
    borderTopWidth: 1,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingTop: spacing.xs,
  },
  lastRow: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    paddingBottom: spacing.xs,
  },
});
