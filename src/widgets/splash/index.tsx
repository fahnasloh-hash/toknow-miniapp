'use client';

import { motion } from 'framer-motion';

export function Splash() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-500 via-rose-500 to-fuchsia-600 text-white">
      <motion.div
        className="absolute -top-32 -left-24 size-72 rounded-full bg-white/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-24 size-96 rounded-full bg-amber-300/30 blur-3xl"
        animate={{ scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <div className="grid size-28 place-items-center rounded-[2rem] bg-white/15 text-6xl shadow-2xl backdrop-blur-xl">
          🃏
        </div>
        <h1 className="text-4xl font-black tracking-tight">ToKnow</h1>
        <p className="text-sm uppercase tracking-[0.3em] text-white/80">Узнавай ближе</p>
      </motion.div>

      <motion.div
        className="absolute bottom-16 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[0, 0.15, 0.3].map((d) => (
          <motion.span
            key={d}
            className="size-2 rounded-full bg-white/90"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: d }}
          />
        ))}
      </motion.div>
    </div>
  );
}
