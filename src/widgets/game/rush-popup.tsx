'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { useT } from '@/shared/i18n/use-t';

export function RushPopup({ onClose }: { onClose: () => void }) {
  const t = useT();
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28 }}
        className="mx-4 mb-[max(1.5rem,env(safe-area-inset-bottom))] w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-2xl"
      >
        <div className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-amber-100 text-2xl dark:bg-amber-900/40">
          ⏳
        </div>
        <h2 className="text-xl font-black">{t.play.rushTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.play.rushBody}</p>
        <Button size="block" className="mt-5" variant="secondary" onClick={onClose}>
          {t.common.done}
        </Button>
      </motion.div>
    </motion.div>
  );
}
