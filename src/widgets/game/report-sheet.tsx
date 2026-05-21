'use client';

import { useState } from 'react';
import { Sheet } from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

const REASONS = [
  'Слишком личный',
  'Непонятно сформулирован',
  'Не нравится тема',
  'Уже встречал',
  'Что-то другое',
];

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (reasons: string[]) => void;
};

export function ReportSheet({ open, onClose, onSubmit }: Props) {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (r: string) =>
    setPicked((curr) =>
      curr.includes(r) ? curr.filter((x) => x !== r) : [...curr, r],
    );

  return (
    <Sheet open={open} onClose={onClose}>
      <h2 className="text-xl font-black">Что не так с вопросом?</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Это поможет нам улучшать колоды
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {REASONS.map((r) => {
          const active = picked.includes(r);
          return (
            <button
              key={r}
              type="button"
              onClick={() => toggle(r)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card',
              )}
            >
              {r}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Отмена
        </Button>
        <Button
          className="flex-1"
          disabled={picked.length === 0}
          hapticType="medium"
          onClick={() => {
            onSubmit(picked);
            setPicked([]);
          }}
        >
          Отправить
        </Button>
      </div>
    </Sheet>
  );
}
