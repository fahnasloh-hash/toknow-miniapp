'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckSquare, Coins, Layers, Play, Users } from 'lucide-react';
import { Screen } from '@/shared/ui/screen';
import { HomeHero } from '@/widgets/home-hero';
import { ROUTES } from '@/shared/config/routes';
import { haptic } from '@/shared/lib/telegram';

const QUICK_LINKS = [
  { href: ROUTES.play, label: 'Играть', icon: Play, hue: 'from-brand-500 to-rose-500' },
  { href: ROUTES.decks, label: 'Колоды', icon: Layers, hue: 'from-violet-500 to-fuchsia-500' },
  { href: ROUTES.tasks, label: 'Задания', icon: CheckSquare, hue: 'from-emerald-400 to-teal-500' },
  { href: ROUTES.characters, label: 'Герои', icon: Users, hue: 'from-amber-400 to-orange-500' },
  { href: ROUTES.coins, label: 'Монеты', icon: Coins, hue: 'from-yellow-400 to-amber-500' },
] as const;

export default function HomePage() {
  return (
    <Screen>
      <HomeHero />

      <section className="mt-6 grid grid-cols-2 gap-3">
        {QUICK_LINKS.map(({ href, label, icon: Icon, hue }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className={i === 0 ? 'col-span-2' : ''}
          >
            <Link
              href={href}
              onClick={() => haptic.light()}
              className={`group relative flex h-28 items-end overflow-hidden rounded-3xl bg-gradient-to-br ${hue} p-4 text-white shadow-md transition-transform active:scale-[0.98]`}
            >
              <Icon className="absolute right-3 top-3 size-9 opacity-30 transition-transform group-hover:scale-110" />
              <span className="text-xl font-extrabold drop-shadow">{label}</span>
            </Link>
          </motion.div>
        ))}
      </section>
    </Screen>
  );
}
