import type { ID } from '@/shared/types/common';

export type TaskCategory = 'daily' | 'weekly' | 'challenge';

export type TaskKind =
  | 'subscribe-channel'
  | 'invite-friends'
  | 'play-one-game'
  | 'play-multiple-games'
  | 'buy-deck'
  | 'buy-character'
  | 'daily-streak'
  | 'favorite-questions'
  | 'finish-deck'
  | 'rate-game'
  | 'use-followup'
  | 'share-app';

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'claimed' | 'locked';

export type Task = {
  id: ID;
  kind: TaskKind;
  category: TaskCategory;
  title: string;
  description: string;
  /** Coins awarded when the user claims completion */
  reward: number;
  /** Progress numerator/denominator — used for streak & multi-step tasks */
  progress: { current: number; total: number };
  status: TaskStatus;
  /** Optional CTA route, opens deep link, etc. */
  ctaUrl?: string;
};

export const TASK_CATEGORY_META: Record<
  TaskCategory,
  { label: string; emoji: string; gradient: string }
> = {
  daily: { label: 'Ежедневные', emoji: '☀️', gradient: 'from-amber-400 to-orange-500' },
  weekly: { label: 'Недельные', emoji: '📅', gradient: 'from-sky-400 to-indigo-500' },
  challenge: { label: 'Челленджи', emoji: '🏆', gradient: 'from-fuchsia-500 to-rose-500' },
};
