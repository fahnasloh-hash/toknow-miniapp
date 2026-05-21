import type { ID } from '@/shared/types/common';

export type Question = {
  id: ID;
  deckId: ID;
  text: string;
  /** Optional follow-up question users can request for depth */
  followUp?: string;
};
