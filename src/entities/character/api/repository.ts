import type { Character } from '../model/types';

/**
 * Six archetypes seeded for the MVP — designed to mirror the
 * reference screen one-to-one. Swap for a real backend by replacing
 * the body of these methods.
 */
const MOCK_CHARACTERS: Character[] = [
  {
    id: 'spark',
    name: 'Спарк',
    tagline: 'Заводила компании',
    archetype: 'spark',
    archetypeLabel: 'ИСКРА',
    faction: 'light',
    rarity: 'epic',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    accent: '#FF7A4D',
    emoji: '⚡',
    description:
      'Вечно заряженный оптимист и генератор идей. Спарк видит возможности там, где другие видят проблемы.',
    personality: ['Энергичный', 'Позитивный', 'Вдохновляющий'],
    ability: {
      id: 'spark-of-ideas',
      name: 'Искра идей',
      description: 'Даёт бонус к получению монет за правильные ответы',
    },
    progression: { current: 0, total: 100 },
    unlockedFromStart: true,
  },
  {
    id: 'luna',
    name: 'Луна',
    tagline: 'Хранитель тайн',
    archetype: 'sage',
    archetypeLabel: 'МУДРЕЦ',
    faction: 'arcane',
    rarity: 'rare',
    gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500',
    accent: '#7C5CFF',
    emoji: '🌙',
    description:
      'Спокойная и мудрая хранительница знаний. Луна знает ответы на самые сложные вопросы.',
    personality: ['Мудрая', 'Спокойная', 'Наблюдательная'],
    ability: {
      id: 'lunar-wisdom',
      name: 'Лунная мудрость',
      description: 'Увеличивает награду за серии правильных ответов',
    },
    progression: { current: 25, total: 100 },
    unlockedFromStart: true,
  },
  {
    id: 'leo',
    name: 'Лео',
    tagline: 'Смелый лидер',
    archetype: 'leader',
    archetypeLabel: 'ЛИДЕР',
    faction: 'wild',
    rarity: 'rare',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    accent: '#22C55E',
    emoji: '🦁',
    description:
      'Естественный лидер и стратег. Лео ведёт команду к победе и не боится сложных вызовов.',
    personality: ['Уверенный', 'Харизматичный', 'Стратегичный'],
    ability: {
      id: 'royal-bonus',
      name: 'Королевский бонус',
      description: 'Увеличивает максимальный баланс монет',
    },
    progression: { current: 40, total: 100 },
    unlockedFromStart: false,
    price: { amount: 250, currency: 'COIN' },
  },
  {
    id: 'mira',
    name: 'Мира',
    tagline: 'Зеркало души',
    archetype: 'creator',
    archetypeLabel: 'ТВОРЕЦ',
    faction: 'spirit',
    rarity: 'epic',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    accent: '#F472B6',
    emoji: '🤖',
    description:
      'Креативная и изобретательная. Мира превращает идеи в реальность и любит красоту.',
    personality: ['Креативная', 'Добрая', 'Артистичная'],
    ability: {
      id: 'inspiration',
      name: 'Вдохновение',
      description: 'Шанс получить двойные монеты за выполнение заданий',
    },
    progression: { current: 60, total: 100 },
    unlockedFromStart: false,
    price: { amount: 350, currency: 'COIN' },
  },
  {
    id: 'koda',
    name: 'Кода',
    tagline: 'Мастер алгоритмов',
    archetype: 'coder',
    archetypeLabel: 'ПРОГРАММИСТ',
    faction: 'tech',
    rarity: 'legendary',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    accent: '#F59E0B',
    emoji: '👨‍💻',
    description:
      'Гений кода и логики. Кода может взломать любую задачу и найти решение в любом алгоритме.',
    personality: ['Гениальный', 'Логичный', 'Интровертный'],
    ability: {
      id: 'success-code',
      name: 'Код успеха',
      description: 'Уменьшает время восстановления энергии на задания',
    },
    progression: { current: 80, total: 100 },
    unlockedFromStart: false,
    price: { amount: 500, currency: 'COIN' },
  },
  {
    id: 'rho',
    name: 'Ро',
    tagline: 'Громовой воин',
    archetype: 'warrior',
    archetypeLabel: 'ВОИН',
    faction: 'shadow',
    rarity: 'mythic',
    gradient: 'from-red-500 via-rose-600 to-red-800',
    accent: '#EF4444',
    emoji: '⚔️',
    description:
      'Отважный воин и защитник. Ро всегда на передовой и никогда не отступает.',
    personality: ['Смелый', 'Решительный', 'Защитник'],
    ability: {
      id: 'flame-victory',
      name: 'Пламя победы',
      description: 'Даёт огромный бонус к монетам за сложные задания',
    },
    progression: { current: 100, total: 100 },
    unlockedFromStart: false,
    price: { amount: 700, currency: 'COIN' },
  },
];

export const characterRepository = {
  list: async (): Promise<Character[]> => Promise.resolve(MOCK_CHARACTERS),
  byId: async (id: string) => MOCK_CHARACTERS.find((c) => c.id === id) ?? null,
};
