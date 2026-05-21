'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { deckRepository, type Deck } from '@/entities/deck';
import { useUserStore } from '@/entities/user';
import { Sheet } from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { haptic } from '@/shared/lib/telegram';
import { DeckCard } from './deck-card';

export function DeckGrid() {
  const owned = useUserStore((s) => s.ownedDecks);
  const spend = useUserStore((s) => s.spendCoins);
  const ownDeck = useUserStore((s) => s.ownDeck);
  const coins = useUserStore((s) => s.coins);

  const { data: groups = [] } = useQuery({ queryKey: ['deck-groups'], queryFn: deckRepository.groups });
  const { data: decks = [] } = useQuery({ queryKey: ['decks'], queryFn: deckRepository.list });

  const byGroup = useMemo(() => {
    const map = new Map<string, Deck[]>();
    decks.forEach((d) => {
      const arr = map.get(d.groupId) ?? [];
      arr.push(d);
      map.set(d.groupId, arr);
    });
    return map;
  }, [decks]);

  const [picked, setPicked] = useState<Deck | null>(null);

  const buy = () => {
    if (!picked?.price) return;
    if (!spend(picked.price.amount)) {
      haptic.error();
      return;
    }
    haptic.success();
    ownDeck(picked.id);
    setPicked(null);
  };

  return (
    <>
      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.id}>
            <header className="mb-3 flex items-center gap-3">
              <div className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${g.gradient} text-2xl shadow-md`}>
                {g.emoji}
              </div>
              <div>
                <h2 className="text-lg font-black leading-tight">{g.title}</h2>
                <p className="text-xs text-muted-foreground">{g.description}</p>
              </div>
            </header>
            <div className="grid grid-cols-2 gap-3">
              {(byGroup.get(g.id) ?? []).map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  owned={owned.includes(deck.id)}
                  onLockedClick={() => setPicked(deck)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Sheet open={!!picked} onClose={() => setPicked(null)}>
        {picked && (
          <div className="space-y-4 text-center">
            <div className="text-6xl">{picked.cover}</div>
            <div>
              <h3 className="text-xl font-black">{picked.title}</h3>
              <p className="text-sm text-muted-foreground">
                {picked.questions.length} вопросов
              </p>
            </div>
            {picked.price ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2">
                  <span className="text-sm text-muted-foreground">Цена:</span>
                  <CoinBadge amount={picked.price.amount} />
                </div>
                <Button
                  size="block"
                  onClick={buy}
                  disabled={coins < picked.price.amount}
                  hapticType="medium"
                >
                  Купить колоду
                </Button>
                {coins < picked.price.amount && (
                  <p className="text-xs text-destructive">Недостаточно монет</p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Колода появится в одном из обновлений</p>
            )}
          </div>
        )}
      </Sheet>
    </>
  );
}
