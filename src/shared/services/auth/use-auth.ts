'use client';

import { useEffect, useState } from 'react';
import { authService } from './service';
import type { AuthSession } from './types';

export function useAuth(): AuthSession | null {
  const [session, setSession] = useState<AuthSession | null>(authService.current());

  useEffect(() => {
    if (!session) setSession(authService.init());
    const unsub = authService.subscribe(setSession);
    return () => {
      unsub();
    };
  }, [session]);

  return session;
}
