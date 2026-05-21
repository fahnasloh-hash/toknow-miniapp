'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckSquare, Coins, Home, Layers, Users } from 'lucide-react';
import { MAIN_TABS } from '@/shared/config/routes';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

const ICONS = {
  tasks: CheckSquare,
  characters: Users,
  home: Home,
  coins: Coins,
  decks: Layers,
} as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md justify-around border-t border-border bg-background/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
      aria-label="Главная навигация"
    >
      {MAIN_TABS.map((tab) => {
        const Icon = ICONS[tab.icon];
        const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        const isCenter = tab.key === 'home';
        return (
          <Link
            key={tab.key}
            href={tab.href}
            onClick={() => haptic.selection()}
            className={cn(
              'group relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {isCenter ? (
              <motion.span
                className={cn(
                  'grid -mt-6 size-14 place-items-center rounded-full text-white shadow-lg shadow-primary/30',
                  'bg-gradient-to-br from-brand-500 to-rose-500',
                )}
                whileTap={{ scale: 0.92 }}
              >
                <Icon className="size-6" strokeWidth={2.4} />
              </motion.span>
            ) : (
              <Icon
                className={cn('size-6 transition-transform', isActive && 'scale-110')}
                strokeWidth={2.2}
              />
            )}
            <span className={cn(isCenter && 'mt-0.5')}>{tab.label}</span>
            {isActive && !isCenter && (
              <motion.span
                layoutId="nav-dot"
                className="absolute -top-0.5 h-1 w-6 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
