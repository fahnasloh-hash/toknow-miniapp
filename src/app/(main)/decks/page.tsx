'use client';

import { Screen, ScreenHeader } from '@/shared/ui/screen';
import { DeckGrid } from '@/widgets/deck-grid';
import { useUserStore } from '@/entities/user';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { useT } from '@/shared/i18n/use-t';

export default function DecksPage() {
  const t = useT();
  const coins = useUserStore((s) => s.coins);
  return (
    <Screen>
      <ScreenHeader title={t.decks.title} right={<CoinBadge amount={coins} variant="pill" />} />
      <DeckGrid />
    </Screen>
  );
}
