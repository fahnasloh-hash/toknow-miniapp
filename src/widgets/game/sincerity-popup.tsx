'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { useT } from '@/shared/i18n/use-t';

export function SincerityPopup({ onContinue }: { onContinue: () => void }) {
  const t = useT();
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 24 }}
        className="mx-6 w-full max-w-sm rounded-3xl bg-card p-7 text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto mb-4 grid size-20 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-4xl shadow-md"
        >
          💛
        </motion.div>
        <h2 className="text-2xl font-black">{t.play.sincerityTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.play.sincerityBody}</p>
        <Button size="block" className="mt-6" hapticType="medium" onClick={onContinue}>
          {t.common.continue}
        </Button>
      </motion.div>
    </motion.div>
  );
}
