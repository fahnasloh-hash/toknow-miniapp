'use client';

import { Trophy } from 'lucide-react';
import { COLLECTION_BONUSES } from '@/entities/character';
import { cn } from '@/shared/lib/cn';

export function CollectionBonuses({ ownedCount }: { ownedCount: number }) {
  return (
    <section className="rounded-3xl border border-white/5 bg-zinc-950/70 p-5">
      <header className="mb-3 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950 shadow-md">
          <Trophy className="size-4" strokeWidth={2.5} />
        </span>
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
            Бонус за коллекцию
          </h3>
          <p className="text-[11px] text-white/55">
            Собирай героев — получай бонусы
          </p>
        </div>
      </header>
      <ul className="space-y-1.5">
        {COLLECTION_BONUSES.map((b) => {
          const active = ownedCount >= b.count;
          return (
            <li
              key={b.count}
              className={cn(
                'flex items-center justify-between rounded-xl border border-white/5 px-3 py-2 transition-colors',
                active ? 'bg-amber-400/10' : 'bg-white/[0.02]',
              )}
            >
              <span
                className={cn(
                  'text-xs font-semibold',
                  active ? 'text-amber-200' : 'text-white/70',
                )}
              >
                {b.count} героя
              </span>
              <span
                className={cn(
                  'text-xs font-extrabold',
                  active ? 'text-amber-300' : 'text-white/40',
                )}
              >
                {b.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
