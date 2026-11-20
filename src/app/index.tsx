import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabBar, TabName } from '@/components/BottomTabBar';
import { useTheme } from '@/hooks/use-theme';
import { AddPracticeScreen } from '@/screens/AddPracticeScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { KnowledgeScreen } from '@/screens/KnowledgeScreen';
import { PracticesScreen } from '@/screens/PracticesScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TodayScreen } from '@/screens/TodayScreen';

// Screens that open on top of a tab (not part of the bottom tab bar).
type Overlay =
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
  const router = useRouter();

  const goToTab = (next: TabName) => {
    setOverlay(null);
    setTab(next);
  };
  // The details are a route of their own: push opens them on top of this screen.
  const openPractice = (practiceId: string) => router.push(`/practice/${practiceId}`);
  const closeOverlay = () => setOverlay(null);

  const renderOverlay = () => {
    switch (overlay?.name) {
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
