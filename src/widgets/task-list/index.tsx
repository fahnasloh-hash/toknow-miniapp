'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { TASK_CATEGORY_META, taskRepository, type TaskCategory } from '@/entities/task';
import { useUserStore } from '@/entities/user';
import { openTelegramLink, haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';
import { TaskCard } from './task-card';

const CATEGORIES: TaskCategory[] = ['daily', 'weekly', 'challenge'];

export function TaskList() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskRepository.list,
  });
  const claimed = useUserStore((s) => s.claimedTasks);
  const claimTask = useUserStore((s) => s.claimTask);
  const addCoins = useUserStore((s) => s.addCoins);

  const [active, setActive] = useState<TaskCategory>('daily');

  const counts = useMemo(() => {
    const map = { daily: 0, weekly: 0, challenge: 0 } as Record<TaskCategory, number>;
    tasks.forEach((t) => map[t.category]++);
    return map;
  }, [tasks]);

  const filtered = tasks.filter((t) => t.category === active);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="shimmer h-32 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {CATEGORIES.map((cat) => {
          const meta = TASK_CATEGORY_META[cat];
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                haptic.selection();
                setActive(cat);
              }}
              className={cn(
                'relative flex flex-col items-start gap-1 overflow-hidden rounded-2xl border p-3 text-left transition-all active:scale-[0.98]',
                isActive
                  ? 'border-transparent text-white shadow-md'
                  : 'border-border bg-card text-foreground',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="task-tab"
                  className={cn('absolute inset-0 -z-0 bg-gradient-to-br', meta.gradient)}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative text-lg">{meta.emoji}</span>
              <span className="relative text-xs font-extrabold leading-tight">
                {meta.label}
              </span>
              <span
                className={cn(
                  'relative text-[10px] font-semibold',
                  isActive ? 'text-white/80' : 'text-muted-foreground',
                )}
              >
                {counts[cat]} заданий
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            claimed={claimed.includes(task.id)}
            onClaim={() => {
              haptic.success();
              addCoins(task.reward);
              claimTask(task.id);
            }}
            onCta={() => task.ctaUrl && openTelegramLink(task.ctaUrl)}
          />
        ))}
      </div>
    </div>
  );
}
