'use client';

import { useEffect, useState } from 'react';
import { tg } from '@/shared/lib/telegram';

export type TgState = {
  ready: boolean;
  colorScheme: 'light' | 'dark';
  platform: string;
  viewportHeight: number;
};

export function useTelegram(): TgState {
  const [state, setState] = useState<TgState>({
    ready: false,
    colorScheme: 'light',
    platform: 'unknown',
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const w = tg();
    if (!w) {
      setState((s) => ({ ...s, ready: true }));
      return;
    }

    w.ready();
    w.expand();
    w.enableClosingConfirmation?.();
    w.disableVerticalSwipes?.();

    const sync = () => {
      setState({
        ready: true,
        colorScheme: w.colorScheme,
        platform: w.platform,
        viewportHeight: w.viewportHeight,
      });
      document.documentElement.style.setProperty(
        '--tg-viewport-height',
        `${w.viewportHeight}px`,
      );
      document.documentElement.style.setProperty(
        '--tg-viewport-stable-height',
        `${w.viewportStableHeight}px`,
      );
      // Respect the user's manual theme override if present;
      // otherwise follow Telegram's color scheme. Defaults to dark.
      const stored = typeof window !== 'undefined' ? localStorage.getItem('toknow.theme') : null;
      if (!stored || stored === 'system') {
        document.documentElement.classList.toggle('dark', w.colorScheme !== 'light');
      }
    };

    sync();
    w.onEvent('themeChanged', sync);
    w.onEvent('viewportChanged', sync);

    return () => {
      w.offEvent('themeChanged', sync);
      w.offEvent('viewportChanged', sync);
    };
  }, []);

  return state;
}
