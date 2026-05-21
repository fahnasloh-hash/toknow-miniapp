import type { ID, Money } from '@/shared/types/common';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type Archetype =
  | 'spark'
  | 'sage'
  | 'leader'
  | 'creator'
  | 'coder'
  | 'warrior';

export type Faction = 'light' | 'shadow' | 'arcane' | 'tech' | 'wild' | 'spirit';

export type PersonalityTag = string;

export type Ability = {
  id: string;
  name: string;
  description: string;
};

export type Character = {
  id: ID;
  name: string;
  /** Short tagline shown under the name */
  tagline: string;
  archetype: Archetype;
  archetypeLabel: string;
  faction: Faction;
  rarity: Rarity;
  /** Tailwind gradient classes for the character card background */
  gradient: string;
  /** Solid hex tint used for glows / borders */
  accent: string;
  /** Emoji placeholder until art assets land */
  emoji: string;
  description: string;
  personality: PersonalityTag[];
  ability: Ability;
  /** Progression points / cap (purely visual today) */
  progression: { current: number; total: number };
  /** Available without payment from the first-launch screen */
  unlockedFromStart: boolean;
  price?: Money;
};

export type CollectionBonus = {
  count: number;
  label: string;
  description: string;
};

export const RARITY_META: Record<
  Rarity,
  { label: string; chip: string; ring: string; aura: string }
> = {
  common: {
    label: 'Обычный',
    chip: 'bg-slate-700 text-slate-100',
    ring: 'ring-slate-500/40',
    aura: 'from-slate-700/40 to-slate-900/40',
  },
  rare: {
    label: 'Редкий',
    chip: 'bg-sky-600 text-white',
    ring: 'ring-sky-400/50',
    aura: 'from-sky-500/30 to-indigo-600/40',
  },
  epic: {
    label: 'Эпический',
    chip: 'bg-fuchsia-600 text-white',
    ring: 'ring-fuchsia-400/60',
    aura: 'from-fuchsia-500/30 to-purple-600/40',
  },
  legendary: {
    label: 'Легендарный',
    chip: 'bg-amber-500 text-amber-950',
    ring: 'ring-amber-300/60',
    aura: 'from-amber-400/40 to-orange-600/40',
  },
  mythic: {
    label: 'Мифический',
    chip: 'bg-rose-600 text-white',
    ring: 'ring-rose-400/60',
    aura: 'from-rose-500/40 to-red-700/40',
  },
};

export const RARITY_ORDER: Rarity[] = ['common', 'rare', 'epic', 'legendary', 'mythic'];

export const COLLECTION_BONUSES: CollectionBonus[] = [
  { count: 3, label: '+10% к монетам', description: '3 героя в коллекции' },
  { count: 4, label: '+20% к опыту', description: '4 героя в коллекции' },
  { count: 5, label: '+30% к наградам', description: '5 героев в коллекции' },
  { count: 6, label: '+50% ко всему', description: 'Полная коллекция' },
];
