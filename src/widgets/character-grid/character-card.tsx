'use client';

import { motion } from 'framer-motion';
import { Crown, Lock } from 'lucide-react';
import type { Character } from '@/entities/character';
import { RARITY_META } from '@/entities/character';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { cn } from '@/shared/lib/cn';

type Props = {
  character: Character;
  owned?: boolean;
  selected?: boolean;
  locked?: boolean;
  onClick?: () => void;
  showAbility?: boolean;
};

export function CharacterCard({
  character,
  owned,
  selected,
  locked,
  onClick,
  showAbility = true,
}: Props) {
  const rarity = RARITY_META[character.rarity];
  const progressPct = Math.round(
    (character.progression.current / character.progression.total) * 100,
  );

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -3 }}
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-3xl border-2 border-white/5 bg-zinc-950/80 text-left shadow-xl ring-1 ring-inset transition-all',
        selected ? 'border-primary ring-primary/40' : rarity.ring,
        locked && 'opacity-90 grayscale-[40%]',
      )}
      style={{
        boxShadow: locked
          ? undefined
          : `0 18px 38px -22px ${character.accent}80, inset 0 1px 0 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div
        className={cn(
          'relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br',
          character.gradient,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />

        <header className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow',
              rarity.chip,
            )}
          >
            {rarity.label}
          </span>
          {owned && !locked && (
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
              ✓ Твой
            </span>
          )}
        </header>

        <motion.span
          className="absolute inset-0 grid place-items-center text-[110px] drop-shadow-2xl"
          animate={selected ? { scale: [1, 1.1, 1] } : { y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {character.emoji}
        </motion.span>

        {locked && (
          <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-[2px]">
            <Lock className="size-9 text-white/90" strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="space-y-3 bg-zinc-950/95 p-4">
        <div>
          <div className="text-xl font-black uppercase tracking-tight text-white">
            {character.name}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
            <Crown className="size-3 text-amber-400" />
            Архетип:{' '}
            <span style={{ color: character.accent }}>{character.archetypeLabel}</span>
          </div>
        </div>

        <p className="line-clamp-3 text-xs leading-snug text-white/70">
          {character.description}
        </p>

        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            Личность
          </div>
          <div className="flex flex-wrap gap-1">
            {character.personality.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/80"
                style={{ color: character.accent, borderColor: `${character.accent}30` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {showAbility && (
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">
              Способность
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-2.5">
              <div
                className="text-xs font-extrabold uppercase tracking-wider"
                style={{ color: character.accent }}
              >
                ✦ {character.ability.name}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-white/65">
                {character.ability.description}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            Прогрессия
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => {
              const filled = i < Math.ceil((progressPct / 100) * 5);
              return (
                <span
                  key={i}
                  className="text-xs"
                  style={{ color: filled ? character.accent : 'rgba(255,255,255,0.15)' }}
                >
                  ★
                </span>
              );
            })}
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: character.accent }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="text-right text-[10px] font-semibold text-white/50">
            {character.progression.current}/{character.progression.total}
          </div>
        </div>

        {!owned && character.price && (
          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
              Цена
            </span>
            <CoinBadge amount={character.price.amount} className="text-coin" />
          </div>
        )}
      </div>
    </motion.button>
  );
}
