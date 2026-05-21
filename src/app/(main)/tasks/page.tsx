'use client';

import { Screen, ScreenHeader } from '@/shared/ui/screen';
import { TaskList } from '@/widgets/task-list';
import { useUserStore } from '@/entities/user';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { useT } from '@/shared/i18n/use-t';

export default function TasksPage() {
  const t = useT();
  const coins = useUserStore((s) => s.coins);
  return (
    <Screen>
      <ScreenHeader title={t.tasks.title} right={<CoinBadge amount={coins} variant="pill" />} />
      <TaskList />
    </Screen>
  );
}
