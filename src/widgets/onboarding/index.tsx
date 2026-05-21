'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { useUserStore } from '@/entities/user';
import { useT } from '@/shared/i18n/use-t';
import { haptic } from '@/shared/lib/telegram';
import { analytics } from '@/shared/services/analytics';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { SLIDES } from './slides';

const SWIPE_THRESHOLD = 60;

export function Onboarding() {
  const t = useT();
  const router = useRouter();
  const complete = useUserStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);
  const direction = useRef(1);

  const titles = [t.onboarding.slide1Title, t.onboarding.slide2Title, t.onboarding.slide3Title];
  const bodies = [t.onboarding.slide1Body, t.onboarding.slide2Body, t.onboarding.slide3Body];

  const goTo = (next: number) => {
    direction.current = next > index ? 1 : -1;
    haptic.selection();
    if (next < 0 || next >= SLIDES.length) return;
    setIndex(next);
  };

  const finish = () => {
    haptic.success();
    analytics.track({ name: 'onboarding_completed' });
    complete();
    router.replace(ROUTES.selectCharacter);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && index < SLIDES.length - 1) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD && index > 0) goTo(index - 1);
  };

  const slide = SLIDES[index];

  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-20 text-sm font-medium text-foreground/70"
      >
        {t.common.skip}
      </button>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction.current} mode="wait">
          <motion.div
            key={slide.key}
            custom={direction.current}
            initial={{ x: direction.current * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction.current * -80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className={cn(
              'flex h-full flex-col items-center justify-center gap-8 bg-gradient-to-br px-6 py-10 text-white',
              slide.gradient,
            )}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="grid size-44 place-items-center rounded-[2.5rem] bg-white/15 text-7xl shadow-2xl backdrop-blur"
            >
              {slide.emoji}
            </motion.div>
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-black tracking-tight">{titles[index]}</h2>
              <p className="text-base text-white/85">{bodies[index]}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <motion.button
              key={s.key}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-2 rounded-full bg-foreground/30"
              animate={{ width: i === index ? 28 : 8, opacity: i === index ? 1 : 0.6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          ))}
        </div>
        {index < SLIDES.length - 1 ? (
          <Button size="block" onClick={() => goTo(index + 1)}>
            {t.common.next}
          </Button>
        ) : (
          <Button size="block" variant="accent" hapticType="medium" onClick={finish}>
            {t.common.start}
          </Button>
        )}
      </div>
    </div>
  );
}
