'use client';

import { motion } from 'framer-motion';
import { HeartCrack, MessageCircleQuestion, Star, X } from 'lucide-react';
import type { Deck } from '@/entities/deck';
import type { Question } from '@/entities/question';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

type Props = {
  deck: Deck;
  question: Question;
  total: number;
  index: number;
  isFavorite: boolean;
  showFollowUp: boolean;
  onFavorite: () => void;
  onReport: () => void;
  onAskFollowUp: () => void;
  onExit: () => void;
};

export function QuestionCard({
  deck,
  question,
  total,
  index,
  isFavorite,
  showFollowUp,
  onFavorite,
  onReport,
  onAskFollowUp,
  onExit,
}: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -16, rotate: 1.5 }}
      transition={{ type: 'spring', damping: 24 }}
      className={cn(
        'relative flex aspect-[3/4] w-full max-w-sm flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-6 shadow-2xl',
        deck.cardBackground,
        deck.cardTextColor,
      )}
    >
      <header className="flex items-center justify-between">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider backdrop-blur">
          {deck.title}
        </span>
        <button
          type="button"
          onClick={() => {
            haptic.warning();
            onExit();
          }}
          className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur"
          aria-label="Выйти"
        >
          <X className="size-5" />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-2xl font-black leading-snug sm:text-3xl">{question.text}</p>
        {showFollowUp && question.followUp && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl bg-white/15 px-4 py-3 text-base font-medium backdrop-blur"
          >
            ↳ {question.followUp}
          </motion.p>
        )}
      </div>

      <footer className="space-y-3">
        <div className="flex items-center justify-between text-xs opacity-80">
          <span>
            {index + 1} / {total}
          </span>
          {question.followUp && (
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onAskFollowUp();
              }}
              className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 font-semibold backdrop-blur"
            >
              <MessageCircleQuestion className="size-3.5" />
              Уточнить
            </button>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              haptic.success();
              onFavorite();
            }}
            aria-label="В избранное"
            className={cn(
              'grid size-11 place-items-center rounded-full backdrop-blur transition-colors',
              isFavorite ? 'bg-amber-400 text-amber-950' : 'bg-white/15',
            )}
          >
            <Star className={cn('size-5', isFavorite && 'fill-current')} />
          </button>
          <button
            type="button"
            onClick={() => {
              haptic.warning();
              onReport();
            }}
            aria-label="Пожаловаться"
            className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur"
          >
            <HeartCrack className="size-5" />
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
