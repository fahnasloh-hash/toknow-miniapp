import type { ID, Money } from '@/shared/types/common';
import type { Question } from '@/entities/question/model/types';

export type DeckGroupId = 'classic' | 'love' | 'special';
export type DeckKind = 'free' | 'paid' | 'special';

export type DeckGroup = {
  id: DeckGroupId;
  title: string;
  emoji: string;
  description: string;
  /** Background tailwind classes for the group header */
  gradient: string;
};

export type Deck = {
  id: ID;
  groupId: DeckGroupId;
  title: string;
  /** Short emoji or asset id used as the card cover */
  cover: string;
  /** Gradient classes used as the card background */
  background: string;
  /** Gradient classes used inside the game when this deck is played */
  cardBackground: string;
  /** Text color used on cards in-game */
  cardTextColor: string;
  kind: DeckKind;
  price?: Money;
  /** Inline questions for MVP — real implementation fetches by deckId */
  questions: Question[];
};
