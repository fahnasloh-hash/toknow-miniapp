export const ROUTES = {
  splash: '/',
  onboarding: '/onboarding',
  selectCharacter: '/select-character',
  home: '/home',
  tasks: '/tasks',
  characters: '/characters',
  coins: '/coins',
  decks: '/decks',
  deck: (id: string) => `/decks/${id}`,
  play: '/play',
  game: (deckId: string) => `/game/${deckId}`,
  feedback: '/feedback',
  favorites: '/favorites',
  settings: '/settings',
} as const;

export const MAIN_TABS = [
  { href: ROUTES.tasks, key: 'tasks', label: 'Задания', icon: 'tasks' },
  { href: ROUTES.characters, key: 'characters', label: 'Герои', icon: 'characters' },
  { href: ROUTES.home, key: 'home', label: 'Главная', icon: 'home' },
  { href: ROUTES.coins, key: 'coins', label: 'Монеты', icon: 'coins' },
  { href: ROUTES.decks, key: 'decks', label: 'Колоды', icon: 'decks' },
] as const;

export type TabKey = (typeof MAIN_TABS)[number]['key'];
