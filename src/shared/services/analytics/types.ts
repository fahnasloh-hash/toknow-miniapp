export type AnalyticsEvent =
  | { name: 'screen_view'; screen: string }
  | { name: 'game_started'; deckId: string }
  | { name: 'game_finished'; deckId: string; questionsSeen: number }
  | { name: 'question_favorited'; deckId: string; questionId: string }
  | { name: 'question_reported'; deckId: string; questionId: string; reasons: string[] }
  | { name: 'task_claimed'; taskId: string; reward: number }
  | { name: 'character_purchased'; characterId: string; price: number }
  | { name: 'deck_purchased'; deckId: string; price: number }
  | { name: 'coin_purchase_attempted'; bundleId: string; method: 'stars' | 'ton'; amount: number }
  | { name: 'coin_purchase_result'; bundleId: string; method: 'stars' | 'ton'; ok: boolean }
  | { name: 'feedback_submitted'; enjoyment: number; pace: string; recommend: string }
  | { name: 'onboarding_completed' }
  | { name: 'character_selected_initial'; characterId: string };

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
  identify(userId: string | number, traits?: Record<string, unknown>): void;
}
