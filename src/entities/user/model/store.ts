'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteRef = { questionId: string; deckId: string };

type UserState = {
  /** Has the user completed onboarding? */
  onboarded: boolean;
  /** Initially selected character (from the first-launch picker) */
  initialCharacterId: string | null;
  /** Characters the user owns (always includes initial) */
  ownedCharacters: string[];
  /** Decks the user owns */
  ownedDecks: string[];
  /** Soft currency balance */
  coins: number;
  /** Total completed games — used to time feedback prompts */
  gamesPlayed: number;
  /** Tasks marked as claimed in this client (UI cache) */
  claimedTasks: string[];
  favorites: FavoriteRef[];
};

type UserActions = {
  completeOnboarding: () => void;
  setInitialCharacter: (id: string) => void;
  ownCharacter: (id: string) => void;
  ownDeck: (id: string) => void;
  spendCoins: (n: number) => boolean;
  addCoins: (n: number) => void;
  registerGamePlayed: () => number;
  claimTask: (id: string) => void;
  toggleFavorite: (ref: FavoriteRef) => void;
  reset: () => void;
};

const INITIAL: UserState = {
  onboarded: false,
  initialCharacterId: null,
  ownedCharacters: [],
  ownedDecks: ['friends', 'family', 'self', 'couple'],
  coins: 120,
  gamesPlayed: 0,
  claimedTasks: [],
  favorites: [],
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      completeOnboarding: () => set({ onboarded: true }),
      setInitialCharacter: (id) =>
        set((s) => ({
          initialCharacterId: id,
          ownedCharacters: s.ownedCharacters.includes(id)
            ? s.ownedCharacters
            : [...s.ownedCharacters, id],
        })),
      ownCharacter: (id) =>
        set((s) =>
          s.ownedCharacters.includes(id)
            ? s
            : { ownedCharacters: [...s.ownedCharacters, id] },
        ),
      ownDeck: (id) =>
        set((s) =>
          s.ownedDecks.includes(id) ? s : { ownedDecks: [...s.ownedDecks, id] },
        ),
      spendCoins: (n) => {
        if (get().coins < n) return false;
        set((s) => ({ coins: s.coins - n }));
        return true;
      },
      addCoins: (n) => set((s) => ({ coins: s.coins + n })),
      registerGamePlayed: () => {
        const next = get().gamesPlayed + 1;
        set({ gamesPlayed: next });
        return next;
      },
      claimTask: (id) =>
        set((s) =>
          s.claimedTasks.includes(id)
            ? s
            : { claimedTasks: [...s.claimedTasks, id] },
        ),
      toggleFavorite: (ref) =>
        set((s) => {
          const exists = s.favorites.some(
            (f) => f.questionId === ref.questionId,
          );
          return {
            favorites: exists
              ? s.favorites.filter((f) => f.questionId !== ref.questionId)
              : [...s.favorites, ref],
          };
        }),
      reset: () => set(INITIAL),
    }),
    { name: 'toknow.user' },
  ),
);
