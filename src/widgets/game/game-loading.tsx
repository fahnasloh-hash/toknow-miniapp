'use client';

import { motion } from 'framer-motion';
import type { Character } from '@/entities/character';
import { useT } from '@/shared/i18n/use-t';
import { cn } from '@/shared/lib/cn';

type Props = {
  characters: Character[];
  background: string;
};

export function GameLoading({ characters, background }: Props) {
  const t = useT();
  return (
    <div className={cn('relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br text-white', background)}>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex items-center gap-6">
        {characters.slice(0, 2).map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, type: 'spring' }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              className="grid size-28 place-items-center rounded-[2rem] bg-white/15 text-6xl shadow-2xl backdrop-blur"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
            >
              {c.emoji}
            </motion.div>
            <span className="text-sm font-bold">{c.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative mt-12 size-12 rounded-full border-4 border-white/30 border-t-white"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />

      <motion.p
        className="mt-6 text-sm uppercase tracking-[0.3em] text-white/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {t.play.loadingHint}
      </motion.p>
    </div>
  );
}
