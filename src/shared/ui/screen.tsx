'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
};

export function Screen({ children, className, bare }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(bare ? 'min-h-[100dvh]' : 'tg-screen pb-24', className)}
    >
      {children}
    </motion.main>
  );
}

export function ScreenHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 -mx-4 mb-4 flex items-center justify-between bg-background/85 px-4 pt-6 pb-3 backdrop-blur">
      <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
      {right}
    </header>
  );
}
