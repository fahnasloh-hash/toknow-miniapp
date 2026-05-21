'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import type { Deck } from '@/entities/deck';
import { LockOverlay } from '@/shared/ui/lock-overlay';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { ROUTES } from '@/shared/config/routes';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

type Props = {
  deck: Deck;
  owned: boolean;
  onLockedClick?: () => void;
};

export function DeckCard({ deck, owned, onLockedClick }: Props) {
  const body = (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      className={cn(
        'relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-md transition-shadow',
        owned ? 'shadow-card/40' : 'shadow-none',
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', deck.background)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-4 text-white">
        <div className="flex items-center justify-between">
          {deck.kind === 'special' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-950">
              <Crown className="size-3" />
              Special
            </span>
          )}
          {deck.kind === 'paid' && !owned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/90 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
              <Sparkles className="size-3" />
              Premium
            </span>
          )}
          {deck.kind === 'free' && (
            <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
              Free
            </span>
          )}
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-6xl drop-shadow-lg">{deck.cover}</span>
        </div>

        <div>
          <div className="text-lg font-black leading-tight">{deck.title}</div>
          <div className="text-xs text-white/85">{deck.questions.length} вопросов</div>
          {!owned && deck.price && (
            <CoinBadge amount={deck.price.amount} className="mt-2 text-white" />
          )}
        </div>
      </div>

      {!owned && <LockOverlay label={deck.price ? `${deck.price.amount} монет` : 'Скоро'} />}
    </motion.div>
  );

  if (!owned) {
    return (
      <button
        type="button"
        onClick={() => {
          haptic.selection();
          onLockedClick?.();
        }}
        className="w-full text-left"
      >
        {body}
      </button>
    );
  }

  return (
    <Link
      href={ROUTES.deck(deck.id)}
      onClick={() => haptic.light()}
      className="block w-full"
    >
      {body}
    </Link>
  );
}
