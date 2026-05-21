'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { deckRepository } from '@/entities/deck';
import { characterRepository } from '@/entities/character';
import { useUserStore } from '@/entities/user';
import {
  GameLoading,
  QuestionCard,
  ReportSheet,
  RushPopup,
  SincerityPopup,
} from '@/widgets/game';
import { Button } from '@/shared/ui/button';
import { useBackButton } from '@/shared/hooks/use-back-button';
import { haptic } from '@/shared/lib/telegram';
import { useRushDetector } from '@/features/play-game';
import { APP_CONFIG } from '@/shared/config/app';
import { ROUTES } from '@/shared/config/routes';

type Phase = 'loading' | 'sincerity' | 'playing' | 'finished';

export default function GamePage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = use(params);
  const router = useRouter();
  useBackButton(() => router.replace(ROUTES.play));

  const { data: deck, isLoading } = useQuery({
    queryKey: ['deck', deckId],
    queryFn: () => deckRepository.byId(deckId),
  });
  const { data: characters = [] } = useQuery({
    queryKey: ['characters'],
    queryFn: characterRepository.list,
  });

  const ownedChars = useUserStore((s) => s.ownedCharacters);
  const initialId = useUserStore((s) => s.initialCharacterId);
  const favorites = useUserStore((s) => s.favorites);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const registerGame = useUserStore((s) => s.registerGamePlayed);

  const gameCharacters = useMemo(() => {
    if (characters.length === 0) return [];
    const owned = characters.filter((c) => ownedChars.includes(c.id));
    const head = characters.find((c) => c.id === initialId);
    const pool = head ? [head, ...owned.filter((c) => c.id !== head.id)] : owned;
    if (pool.length < 2) {
      const filler = characters.filter((c) => !pool.includes(c));
      return [...pool, ...filler].slice(0, 2);
    }
    return pool.slice(0, 2);
  }, [characters, ownedChars, initialId]);

  const [phase, setPhase] = useState<Phase>('loading');
  const [index, setIndex] = useState(0);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [rushOpen, setRushOpen] = useState(false);
  const rush = useRushDetector();

  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => setPhase('sincerity'), 1700);
    return () => clearTimeout(t);
  }, [phase]);

  if (isLoading || !deck) return <div className="shimmer h-screen" />;
  if (phase === 'loading' || gameCharacters.length === 0) {
    return (
      <GameLoading
        characters={gameCharacters.length ? gameCharacters : characters.slice(0, 2)}
        background={deck.background}
      />
    );
  }

  const question = deck.questions[index];
  const isFavorited = favorites.some((f) => f.questionId === question.id);

  const startPlaying = () => {
    setPhase('playing');
    rush.markShown();
  };

  const goNext = () => {
    if (rush.isRushing()) {
      setRushOpen(true);
      haptic.warning();
      return;
    }
    haptic.selection();
    if (index >= deck.questions.length - 1) {
      finishGame();
      return;
    }
    setShowFollowUp(false);
    setIndex((i) => i + 1);
    rush.markShown();
  };

  const finishGame = () => {
    setPhase('finished');
    const total = registerGame();
    if (total % APP_CONFIG.feedbackEveryNGames === 0) {
      router.replace(ROUTES.feedback);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-between gap-6 bg-background px-4 py-[max(2rem,env(safe-area-inset-top))]">
      <AnimatePresence>
        {phase === 'sincerity' && <SincerityPopup onContinue={startPlaying} />}
      </AnimatePresence>

      <AnimatePresence>{rushOpen && <RushPopup onClose={() => setRushOpen(false)} />}</AnimatePresence>

      <ReportSheet
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={() => {
          setReportOpen(false);
          haptic.success();
        }}
      />

      {phase === 'playing' && (
        <>
          <div className="flex w-full max-w-sm items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold">{deck.title}</span>
            <span>{index + 1} / {deck.questions.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <QuestionCard
              key={question.id}
              deck={deck}
              question={question}
              total={deck.questions.length}
              index={index}
              isFavorite={isFavorited}
              showFollowUp={showFollowUp}
              onFavorite={() => toggleFavorite({ questionId: question.id, deckId: deck.id })}
              onReport={() => setReportOpen(true)}
              onAskFollowUp={() => setShowFollowUp(true)}
              onExit={() => router.replace(ROUTES.play)}
            />
          </AnimatePresence>

          <Button size="block" hapticType="medium" onClick={goNext} className="max-w-sm">
            {index >= deck.questions.length - 1 ? 'Завершить' : 'Следующий'}
            <ChevronRight className="size-5" />
          </Button>
        </>
      )}

      {phase === 'finished' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="m-auto flex max-w-sm flex-col items-center gap-4 text-center"
        >
          <div className="text-7xl">🥂</div>
          <h2 className="text-2xl font-black">Хорошая игра!</h2>
          <p className="text-sm text-muted-foreground">
            Запиши пару мыслей в избранное — пригодится для следующего раза.
          </p>
          <div className="grid w-full grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => router.replace(ROUTES.decks)}>
              К колодам
            </Button>
            <Button
              onClick={() => {
                setIndex(0);
                setPhase('loading');
              }}
            >
              Сыграть ещё
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
