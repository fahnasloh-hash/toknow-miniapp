'use client';

import { motion } from 'framer-motion';
import { Check, ChevronRight, Lock } from 'lucide-react';
import type { Task } from '@/entities/task';
import { Button } from '@/shared/ui/button';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { Progress } from '@/shared/ui/progress';
import { cn } from '@/shared/lib/cn';

type Props = {
  task: Task;
  claimed?: boolean;
  onClaim?: () => void;
  onCta?: () => void;
};

const KIND_EMOJI: Record<Task['kind'], string> = {
  'subscribe-channel': '📢',
  'invite-friends': '🤝',
  'play-one-game': '🎮',
  'play-multiple-games': '🎲',
  'buy-deck': '🛍️',
  'buy-character': '🎭',
  'daily-streak': '🔥',
  'favorite-questions': '⭐',
  'finish-deck': '🏁',
  'rate-game': '⭐',
  'use-followup': '💬',
  'share-app': '📤',
};

export function TaskCard({ task, claimed, onClaim, onCta }: Props) {
  const completed = task.progress.current >= task.progress.total;
  const isLocked = task.status === 'locked';
  const isStreak = task.kind === 'daily-streak';

  return (
    <motion.article
      layout
      className={cn(
        'flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm',
        claimed && 'opacity-60',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-muted text-2xl">
          {KIND_EMOJI[task.kind]}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold leading-tight">{task.title}</h3>
            <CoinBadge amount={task.reward} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{task.description}</p>
        </div>
      </div>

      {isStreak ? (
        <StreakProgress current={task.progress.current} total={task.progress.total} />
      ) : task.progress.total > 1 ? (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Прогресс</span>
            <span>
              {task.progress.current} / {task.progress.total}
            </span>
          </div>
          <Progress value={task.progress.current} max={task.progress.total} />
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        {isLocked && (
          <Button variant="outline" size="sm" disabled className="flex-1" hapticType={null}>
            <Lock className="size-4" /> Скоро
          </Button>
        )}
        {!isLocked && claimed && (
          <Button variant="secondary" size="sm" disabled className="flex-1" hapticType={null}>
            <Check className="size-4" /> Получено
          </Button>
        )}
        {!isLocked && !claimed && completed && (
          <Button size="sm" className="flex-1" onClick={onClaim} hapticType="medium">
            Забрать награду
          </Button>
        )}
        {!isLocked && !claimed && !completed && task.ctaUrl && (
          <Button variant="primary" size="sm" className="flex-1" onClick={onCta}>
            Открыть <ChevronRight className="size-4" />
          </Button>
        )}
        {!isLocked && !claimed && !completed && !task.ctaUrl && (
          <Button variant="outline" size="sm" className="flex-1" disabled hapticType={null}>
            В процессе
          </Button>
        )}
      </div>
    </motion.article>
  );
}

function StreakProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-between gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        return (
          <div
            key={i}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 rounded-xl px-1.5 py-2 text-[10px] font-bold',
              done
                ? 'bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-md shadow-orange-400/30'
                : 'bg-muted text-muted-foreground',
            )}
          >
            <span className="text-lg">{done ? '🔥' : '·'}</span>
            <span>День {i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}
