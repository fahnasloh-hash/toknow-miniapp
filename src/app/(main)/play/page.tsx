'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Screen, ScreenHeader } from '@/shared/ui/screen';
import { Button } from '@/shared/ui/button';
import { deckRepository } from '@/entities/deck';
import { useUserStore } from '@/entities/user';
import { useT } from '@/shared/i18n/use-t';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

export default function PlayPage() {
  const t = useT();
  const coins = useUserStore((s) => s.coins);
  const ownedDecks = useUserStore((s) => s.ownedDecks);
  const { data: decks = [] } = useQuery({ queryKey: ['decks'], queryFn: deckRepository.list });

  const playable = decks.filter((d) => ownedDecks.includes(d.id));

  return (
    <Screen>
      <ScreenHeader title={t.tabs.play} right={<CoinBadge amount={coins} variant="pill" />} />
      <p className="-mt-2 mb-5 text-sm text-muted-foreground">
        Выбери колоду — и начинай разговор.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {playable.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 * i }}
          >
            <Link
              href={`/game/${d.id}`}
              onClick={() => haptic.medium()}
              className={cn(
                'relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-4 text-white shadow-md transition-transform active:scale-[0.98]',
                d.background,
              )}
            >
              <div className="text-4xl">{d.cover}</div>
              <div>
                <div className="text-base font-extrabold leading-tight">{d.title}</div>
                <div className="text-[11px] text-white/85">{d.questions.length} вопросов</div>
              </div>
              <Play
                strokeWidth={2.5}
                className="absolute right-3 top-3 size-7 rounded-full bg-white/25 p-1 backdrop-blur"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      {playable.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">Пока нет доступных колод</p>
          <Link href="/decks">
            <Button className="mt-4">Открыть магазин колод</Button>
          </Link>
        </div>
      )}
    </Screen>
  );
}
