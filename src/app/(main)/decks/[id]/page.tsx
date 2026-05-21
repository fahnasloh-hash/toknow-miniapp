'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import { Screen } from '@/shared/ui/screen';
import { Button } from '@/shared/ui/button';
import { deckRepository } from '@/entities/deck';
import { useBackButton } from '@/shared/hooks/use-back-button';

export default function DeckDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  useBackButton();
  const { data: deck, isLoading } = useQuery({
    queryKey: ['deck', id],
    queryFn: () => deckRepository.byId(id),
  });

  if (isLoading) return <div className="shimmer h-screen" />;
  if (!deck) return notFound();

  return (
    <Screen>
      <div className={`-mx-4 mb-6 flex flex-col items-center gap-3 rounded-b-[2.5rem] bg-gradient-to-br ${deck.background} px-6 pb-8 pt-[max(2.5rem,env(safe-area-inset-top))] text-white`}>
        <div className="text-7xl drop-shadow-xl">{deck.cover}</div>
        <h1 className="text-3xl font-black">{deck.title}</h1>
        <p className="text-sm text-white/85">{deck.questions.length} вопросов</p>
      </div>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Примеры вопросов
      </h2>
      <ul className="space-y-2">
        {deck.questions.slice(0, 4).map((q) => (
          <li
            key={q.id}
            className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed"
          >
            {q.text}
          </li>
        ))}
      </ul>

      <div className="sticky bottom-20 mt-8 -mx-4 bg-gradient-to-t from-background via-background to-transparent px-4 pb-6 pt-6">
        <Link href={`/game/${deck.id}`}>
          <Button size="block" hapticType="medium">
            <Play className="size-5" /> Играть колодой
          </Button>
        </Link>
      </div>
    </Screen>
  );
}
