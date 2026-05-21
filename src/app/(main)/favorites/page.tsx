'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Screen, ScreenHeader } from '@/shared/ui/screen';
import { Button } from '@/shared/ui/button';
import { deckRepository } from '@/entities/deck';
import { useUserStore } from '@/entities/user';
import { useBackButton } from '@/shared/hooks/use-back-button';
import { ROUTES } from '@/shared/config/routes';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

export default function FavoritesPage() {
  useBackButton();
  const favorites = useUserStore((s) => s.favorites);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const { data: decks = [] } = useQuery({ queryKey: ['decks'], queryFn: deckRepository.list });

  const rows = useMemo(() => {
    return favorites
      .map((f) => {
        const deck = decks.find((d) => d.id === f.deckId);
        const question = deck?.questions.find((q) => q.id === f.questionId);
        return deck && question ? { deck, question } : null;
      })
      .filter((x): x is { deck: NonNullable<typeof x>['deck']; question: NonNullable<typeof x>['question'] } => x !== null);
  }, [favorites, decks]);

  return (
    <Screen>
      <ScreenHeader title="Избранное" />
      {rows.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-10 text-center">
          <div className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-amber-100 text-2xl dark:bg-amber-900/40">
            ⭐
          </div>
          <p className="text-sm text-muted-foreground">
            Здесь будут вопросы, которые ты отметишь звёздочкой во время игры.
          </p>
          <Link href={ROUTES.play}>
            <Button className="mt-5">Начать игру</Button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map(({ deck, question }, i) => (
            <motion.li
              key={question.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className={cn(
                'relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-md',
                deck.cardBackground,
                deck.cardTextColor,
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur">
                  {deck.title}
                </span>
                <button
                  type="button"
                  aria-label="Убрать из избранного"
                  onClick={() => {
                    haptic.light();
                    toggleFavorite({ questionId: question.id, deckId: deck.id });
                  }}
                  className="grid size-9 place-items-center rounded-full bg-white/20 backdrop-blur"
                >
                  <Star className="size-4 fill-current text-amber-300" />
                </button>
              </div>
              <p className="mt-4 text-lg font-bold leading-snug">{question.text}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </Screen>
  );
}
