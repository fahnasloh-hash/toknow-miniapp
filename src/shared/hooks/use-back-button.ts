'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { backButton, haptic } from '@/shared/lib/telegram';

export function useBackButton(handler?: () => void) {
  const router = useRouter();

  useEffect(() => {
    const cb = () => {
      haptic.light();
      if (handler) handler();
      else router.back();
    };
    const cleanup = backButton.show(cb);
    return cleanup;
  }, [handler, router]);
}
