import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomTabBar, TabName } from './src/components/BottomTabBar';
import { practices } from './src/data/mockData';
import { AddPracticeScreen } from './src/screens/AddPracticeScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { KnowledgeScreen } from './src/screens/KnowledgeScreen';
import { PracticeDetailsScreen } from './src/screens/PracticeDetailsScreen';
import { PracticesScreen } from './src/screens/PracticesScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TodayScreen } from './src/screens/TodayScreen';
import { colors } from './src/theme';

// Screens that open on top of a tab (not part of the bottom tab bar).
type Overlay =
  | { name: 'practice'; practiceId: string }
  | { name: 'addPractice' }
  | { name: 'settings' }
  | null;

/**
 * Week 4: a simple state-based switcher so every static screen can be
 * previewed in Expo Go. It is replaced by Expo Router (Weeks 7–8).
 */
export default function App() {
  const [tab, setTab] = useState<TabName>('today');
  const [overlay, setOverlay] = useState<Overlay>(null);

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
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>{overlay ? renderOverlay() : renderTab()}</View>
        <BottomTabBar active={tab} onSelect={goToTab} />
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
