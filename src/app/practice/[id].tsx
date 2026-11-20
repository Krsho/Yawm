import { useLocalSearchParams, useRouter } from 'expo-router';

import { EmptyState } from '@/components/EmptyState';
import { HeaderBar } from '@/components/HeaderBar';
import { Screen } from '@/components/Screen';
import { getPractice } from '@/data/api';
import { PracticeDetailsScreen } from '@/screens/PracticeDetailsScreen';

/** Dynamic route: /practice/fajr, /practice/maghrib, ... shows the details of that practice. */
export default function PracticeRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const practice = getPractice(id);

  // When the screen was opened directly from its address there is nothing to go back to,
  // so go to the home screen instead.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (!practice) {
    return (
      <Screen header={<HeaderBar title="Practice Details" onPress={goBack} />}>
        <EmptyState title="Practice not found" message={`There is no practice with the id "${id}".`} />
      </Screen>
    );
  }

  return <PracticeDetailsScreen practice={practice} onBack={goBack} />;
}
