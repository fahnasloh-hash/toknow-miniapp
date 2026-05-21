'use client';

import { useTelegram } from '@/shared/hooks/use-telegram';

/** Mounts once at the root to boot Telegram WebApp, sync theme & viewport vars. */
export function TelegramInit() {
  useTelegram();
  return null;
}
