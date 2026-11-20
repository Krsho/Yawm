import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabBar, TabName } from '@/components/BottomTabBar';
import { practices } from '@/data/mockData';
import { useTheme } from '@/hooks/use-theme';
import { AddPracticeScreen } from '@/screens/AddPracticeScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { KnowledgeScreen } from '@/screens/KnowledgeScreen';
import { PracticeDetailsScreen } from '@/screens/PracticeDetailsScreen';
import { PracticesScreen } from '@/screens/PracticesScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TodayScreen } from '@/screens/TodayScreen';

// Screens that open on top of a tab (not part of the bottom tab bar).
type Overlay =
  | { name: 'practice'; practiceId: string }
  | { name: 'addPractice' }
  | { name: 'settings' }
  | null;

/**
 * Home route (/). Until the tabs move to Expo Router in Week 8, it still
 * switches between the tab screens with state.
 */
export default function HomeScreen() {
  const [tab, setTab] = useState<TabName>('today');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const theme = useTheme();

  const goToTab = (next: TabName) => {
    setOverlay(null);
    setTab(next);
  };
  const openPractice = (practiceId: string) => setOverlay({ name: 'practice', practiceId });
  const closeOverlay = () => setOverlay(null);

  const renderOverlay = () => {
    switch (overlay?.name) {
      case 'practice': {
        const practice = practices.find((p) => p.id === overlay.practiceId) ?? practices[0];
        return (
          <PracticeDetailsScreen
            practice={practice}
            onBack={closeOverlay}
            onEdit={() => setOverlay({ name: 'addPractice' })}
          />
        );
      }
      case 'addPractice':
        return <AddPracticeScreen onClose={closeOverlay} />;
      case 'settings':
        return (
          <SettingsScreen onBack={closeOverlay} onManagePractices={() => goToTab('practices')} />
        );
      default:
        return null;
    }
  };

  const renderTab = () => {
    switch (tab) {
      case 'today':
        return (
          <TodayScreen
            onOpenSettings={() => setOverlay({ name: 'settings' })}
            onOpenPractice={openPractice}
            onViewAllPractices={() => goToTab('practices')}
            onOpenKnowledge={() => goToTab('knowledge')}
          />
        );
      case 'practices':
        return (
          <PracticesScreen
            onOpenPractice={openPractice}
            onAddPractice={() => setOverlay({ name: 'addPractice' })}
          />
        );
      case 'knowledge':
        return <KnowledgeScreen />;
      case 'history':
        return <HistoryScreen />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>{overlay ? renderOverlay() : renderTab()}</View>
      <BottomTabBar active={tab} onSelect={goToTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
