import { RARITY_META, RARITY_ORDER } from '@/entities/character';
import { cn } from '@/shared/lib/cn';

const HINTS: Record<(typeof RARITY_ORDER)[number], string> = {
  common: 'Базовые персонажи',
  rare: 'Улучшенные способности',
  epic: 'Мощные навыки',
  legendary: 'Уникальные способности',
  mythic: 'Максимальная мощь',
};

export function RarityLegend() {
  return (
    <section className="rounded-3xl border border-white/5 bg-zinc-950/70 p-5">
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
        Редкости персонажей
      </h3>
      <ul className="grid grid-cols-5 gap-1">
        {RARITY_ORDER.map((r) => (
          <li key={r} className="flex flex-col items-center gap-1 text-center">
            <span
              className={cn(
                'w-full rounded-md py-1 text-[9px] font-extrabold uppercase tracking-wider',
                RARITY_META[r].chip,
              )}
            >
              {RARITY_META[r].label}
            </span>
            <span className="text-[10px] leading-tight text-white/55">{HINTS[r]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
