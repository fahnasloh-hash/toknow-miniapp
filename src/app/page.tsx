'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Splash } from '@/widgets/splash';
import { useUserStore } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes';

const MIN_SPLASH_MS = 1500;

export default function SplashPage() {
  const router = useRouter();
  const onboarded = useUserStore((s) => s.onboarded);
  const initial = useUserStore((s) => s.initialCharacterId);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!onboarded) router.replace(ROUTES.onboarding);
      else if (!initial) router.replace(ROUTES.selectCharacter);
      else router.replace(ROUTES.home);
    }, MIN_SPLASH_MS);
    return () => clearTimeout(t);
  }, [router, onboarded, initial]);

  return <Splash />;
}
