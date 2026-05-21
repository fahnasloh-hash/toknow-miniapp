'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DICT, type Dict, type Locale } from './dictionaries';

type LocaleStore = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: 'ru',
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'toknow.locale' },
  ),
);

export function useT(): Dict {
  const locale = useLocaleStore((s) => s.locale);
  return DICT[locale];
}
