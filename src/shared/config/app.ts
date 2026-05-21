export const APP_CONFIG = {
  name: 'ToKnow',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.example.com',
  botName: process.env.NEXT_PUBLIC_TG_BOT_NAME ?? 'ToKnowBot',
  channelLink: 'https://t.me/' + (process.env.NEXT_PUBLIC_TG_CHANNEL ?? 'toknow').replace('@', ''),
  feedbackEveryNGames: 6,
  rushThresholdMs: 3000,
  streakRequiredDays: 5,
  invitesRequired: 5,
} as const;
