'use client';

import { useRef } from 'react';
import { APP_CONFIG } from '@/shared/config/app';

/** Records the moment the current card appeared and tells us whether
 *  the user is hurrying past it. */
export function useRushDetector() {
  const shownAt = useRef<number>(Date.now());

  return {
    markShown: () => {
      shownAt.current = Date.now();
    },
    isRushing: () => Date.now() - shownAt.current < APP_CONFIG.rushThresholdMs,
  };
}
