'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useT } from '@/shared/i18n/use-t';
import { haptic } from '@/shared/lib/telegram';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { feedbackSchema, type FeedbackInput } from './feedback-schema';

const PACE_OPTIONS: { value: FeedbackInput['pace']; label: string }[] = [
  { value: 'too-slow', label: 'Медленно' },
  { value: 'just-right', label: 'В самый раз' },
  { value: 'too-fast', label: 'Быстро' },
];
const REC_OPTIONS: { value: FeedbackInput['wouldRecommend']; label: string }[] = [
  { value: 'yes', label: 'Да' },
  { value: 'maybe', label: 'Возможно' },
  { value: 'no', label: 'Нет' },
];

export function FeedbackForm() {
  const t = useT();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { enjoyment: 4, pace: 'just-right', wouldRecommend: 'yes', comment: '' },
  });

  const next = async () => {
    haptic.selection();
    if (step === 0 && !(await form.trigger('enjoyment'))) return;
    if (step === 1 && !(await form.trigger('pace'))) return;
    if (step === 2 && !(await form.trigger('wouldRecommend'))) return;
    setStep((s) => s + 1);
  };

  const onSubmit = form.handleSubmit(async () => {
    haptic.success();
    setSubmitted(true);
    setTimeout(() => router.replace(ROUTES.home), 1500);
  });

  const enjoyment = form.watch('enjoyment');
  const pace = form.watch('pace');
  const rec = form.watch('wouldRecommend');

  return (
    <div className="flex min-h-[100dvh] flex-col px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">{t.feedback.title}</h1>
        <button
          type="button"
          onClick={() => router.replace(ROUTES.home)}
          className="text-sm text-muted-foreground"
        >
          {t.common.skip}
        </button>
      </header>

      <div className="mb-6 flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i <= step ? 'bg-primary' : 'bg-muted',
            )}
          />
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="m-auto flex flex-col items-center gap-3 text-center"
            >
              <div className="text-6xl">🙏</div>
              <h2 className="text-2xl font-black">{t.feedback.thanks}</h2>
            </motion.div>
          ) : step === 0 ? (
            <Step key="s0" title="Как тебе сегодняшняя игра?">
              <div className="mt-6 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Оценка ${n}`}
                    onClick={() => {
                      haptic.selection();
                      form.setValue('enjoyment', n);
                    }}
                    className="p-1"
                  >
                    <Star
                      className={cn(
                        'size-10 transition-all',
                        n <= enjoyment ? 'fill-amber-400 text-amber-400' : 'text-muted',
                      )}
                    />
                  </button>
                ))}
              </div>
            </Step>
          ) : step === 1 ? (
            <Step key="s1" title="Темп игры был…">
              <OptionGroup
                options={PACE_OPTIONS}
                value={pace}
                onChange={(v) => form.setValue('pace', v as FeedbackInput['pace'])}
              />
            </Step>
          ) : step === 2 ? (
            <Step key="s2" title="Посоветуешь друзьям?">
              <OptionGroup
                options={REC_OPTIONS}
                value={rec}
                onChange={(v) => form.setValue('wouldRecommend', v as FeedbackInput['wouldRecommend'])}
              />
            </Step>
          ) : (
            <Step key="s3" title="Что улучшить? (необязательно)">
              <textarea
                {...form.register('comment')}
                rows={5}
                className="mt-4 w-full resize-none rounded-2xl border border-border bg-card p-4 text-base outline-none ring-primary focus:ring-2"
                placeholder="Напиши пару слов…"
              />
            </Step>
          )}
        </AnimatePresence>

        {!submitted && (
          <div className="mt-auto pt-6">
            {step < 3 ? (
              <Button size="block" type="button" onClick={next} hapticType="light">
                {t.common.next}
              </Button>
            ) : (
              <Button size="block" type="submit" hapticType="medium">
                {t.feedback.submit}
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
      className="space-y-2"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </motion.section>
  );
}

function OptionGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-4 grid gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => {
              haptic.selection();
              onChange(o.value);
            }}
            className={cn(
              'flex items-center justify-between rounded-2xl border p-4 text-left transition-colors',
              active
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-card text-muted-foreground',
            )}
          >
            <span className="text-base font-semibold">{o.label}</span>
            <span
              className={cn(
                'size-5 rounded-full border-2 transition-colors',
                active ? 'border-primary bg-primary' : 'border-border',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
