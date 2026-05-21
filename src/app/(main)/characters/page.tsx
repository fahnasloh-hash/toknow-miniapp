'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Screen } from '@/shared/ui/screen';
import {
  characterRepository,
  RARITY_META,
  type Character,
} from '@/entities/character';
import { useUserStore } from '@/entities/user';
import { CharacterCard } from '@/widgets/character-grid/character-card';
import { CollectionBonuses } from '@/widgets/character-grid/collection-bonuses';
import { RarityLegend } from '@/widgets/character-grid/rarity-legend';
import { HowToGet } from '@/widgets/character-grid/how-to-get';
import { Sheet } from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { useT } from '@/shared/i18n/use-t';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

export default function CharactersPage() {
  const t = useT();
  const coins = useUserStore((s) => s.coins);
  const owned = useUserStore((s) => s.ownedCharacters);
  const spend = useUserStore((s) => s.spendCoins);
  const ownChar = useUserStore((s) => s.ownCharacter);

  const { data: characters = [] } = useQuery({
    queryKey: ['characters'],
    queryFn: characterRepository.list,
  });

  const [picked, setPicked] = useState<Character | null>(null);

  const stats = useMemo(() => {
    const rarities = new Set(characters.map((c) => c.rarity));
    const factions = new Set(characters.map((c) => c.faction));
    return { total: characters.length, rarities: rarities.size, factions: factions.size };
  }, [characters]);

  const handlePurchase = () => {
    if (!picked?.price) return;
    if (!spend(picked.price.amount)) {
      haptic.error();
      return;
    }
    haptic.success();
    ownChar(picked.id);
    setPicked(null);
  };

  return (
    <Screen className="!bg-zinc-950 text-white">
      <header className="-mx-4 mb-5 bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 pb-5 pt-[max(2rem,env(safe-area-inset-top))]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Персонажи
            </h1>
            <p className="mt-1 text-xs leading-snug text-white/55">
              Каждый персонаж обладает уникальным характером, навыками и историей. Собери их всех!
            </p>
          </div>
          <CoinBadge amount={coins} variant="pill" className="bg-amber-400/10 text-amber-300" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <StatChip label="Всего" value={stats.total} />
          <StatChip label="Фракций" value={stats.factions} />
          <StatChip label="Редкостей" value={stats.rarities} />
        </div>
      </header>

      <div className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/55">
        <Sparkles className="size-3 text-amber-300" />
        Мир: Эмодзи-Вселенная
      </div>

      <div className="grid grid-cols-2 gap-3">
        {characters.map((c, i) => {
          const isOwned = owned.includes(c.id);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
            >
              <CharacterCard
                character={c}
                owned={isOwned}
                locked={!isOwned}
                onClick={() => {
                  if (isOwned) {
                    haptic.selection();
                    return;
                  }
                  if (!c.price) {
                    haptic.warning();
                    return;
                  }
                  haptic.selection();
                  setPicked(c);
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <RarityLegend />
        <HowToGet />
        <CollectionBonuses ownedCount={owned.length} />
      </div>

      <Sheet open={!!picked} onClose={() => setPicked(null)}>
        {picked && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={cn(
                'grid size-28 place-items-center rounded-[2rem] bg-gradient-to-br text-6xl shadow-xl',
                picked.gradient,
              )}
            >
              {picked.emoji}
            </div>
            <div>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider',
                  RARITY_META[picked.rarity].chip,
                )}
              >
                {RARITY_META[picked.rarity].label}
              </span>
              <h2 className="mt-2 text-2xl font-black uppercase">{picked.name}</h2>
              <p className="text-sm text-muted-foreground">{picked.tagline}</p>
            </div>
            <p className="text-sm text-foreground/80">{picked.description}</p>
            <div className="w-full rounded-2xl border border-border bg-card p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Способность
              </div>
              <div
                className="mt-1 text-sm font-extrabold uppercase tracking-wider"
                style={{ color: picked.accent }}
              >
                ✦ {picked.ability.name}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {picked.ability.description}
              </div>
            </div>
            {picked.price && (
              <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2">
                <span className="text-sm text-muted-foreground">Цена:</span>
                <CoinBadge amount={picked.price.amount} />
              </div>
            )}
            <div className="grid w-full grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setPicked(null)}>
                {t.common.cancel}
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={!picked.price || coins < (picked.price?.amount ?? 0)}
              >
                {t.character.buy}
              </Button>
            </div>
            {picked.price && coins < picked.price.amount && (
              <p className="text-xs text-destructive">Недостаточно монет</p>
            )}
          </div>
        )}
      </Sheet>
    </Screen>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-2 py-2">
      <div className="text-[10px] font-bold uppercase tracking-wider text-white/55">
        {label}
      </div>
      <div className="text-xl font-black text-white">{value}</div>
    </div>
  );
}
