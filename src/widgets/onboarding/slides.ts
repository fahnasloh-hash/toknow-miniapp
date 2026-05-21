export type Slide = {
  key: string;
  emoji: string;
  gradient: string;
};

export const SLIDES: Slide[] = [
  { key: 'slide1', emoji: '💬', gradient: 'from-brand-400 via-rose-400 to-pink-500' },
  { key: 'slide2', emoji: '🎭', gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500' },
  { key: 'slide3', emoji: '🃏', gradient: 'from-amber-400 via-orange-500 to-red-500' },
];
