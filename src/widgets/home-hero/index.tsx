'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Settings, Sparkles, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';
import { characterRepository } from '@/entities/character';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { ROUTES } from '@/shared/config/routes';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

export function HomeHero() {
  const initialId = useUserStore((s) => s.initialCharacterId);
  const coins = useUserStore((s) => s.coins);
  const games = useUserStore((s) => s.gamesPlayed);

  const { data: character } = useQuery({
    queryKey: ['character', initialId],
    queryFn: () => (initialId ? characterRepository.byId(initialId) : null),
    enabled: !!initialId,
  });

  return (
    <div className="relative -mx-4 overflow-hidden rounded-b-[2.5rem] px-4 pt-[max(2rem,env(safe-area-inset-top))] pb-8">
      <div
        className={cn(
          'absolute inset-0 -z-10 bg-gradient-to-br',
          character?.gradient ?? 'from-brand-400 via-rose-400 to-fuchsia-500',
        )}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">Привет 👋</p>
          <h1 className="text-3xl font-black text-white drop-shadow">
            {character?.name ?? 'ToKnow'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.favorites}
            onClick={() => haptic.selection()}
            aria-label="Избранное"
            className="grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur"
          >
            <Star className="size-5" />
          </Link>
          <Link
            href={ROUTES.settings}
            onClick={() => haptic.selection()}
            aria-label="Настройки"
            className="grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur"
          >
            <Settings className="size-5" />
          </Link>
          <Link
            href={ROUTES.coins}
            onClick={() => haptic.selection()}
            className="rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur"
          >
            <CoinBadge amount={coins} className="text-white" />
          </Link>
        </div>
      </header>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.05 }}
        className="my-6 grid place-items-center text-[120px] drop-shadow-2xl"
      >
        {character?.emoji ?? '🃏'}
      </motion.div>

      <div className="flex gap-3 text-sm">
        <Stat icon={<Sparkles className="size-4" />} label="Игр сыграно" value={games} />
        <Stat icon={<Play className="size-4" />} label="Серия" value="—" />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex-1 rounded-2xl bg-white/15 px-4 py-3 text-white backdrop-blur">
      <div className="flex items-center gap-1 text-xs uppercase tracking-wider opacity-80">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}
