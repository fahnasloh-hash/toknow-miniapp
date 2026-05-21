'use client';

import { useEffect } from 'react';
import { mainButton } from '@/shared/lib/telegram';

export function useMainButton(params: { text: string; onClick: () => void; enabled?: boolean }) {
  useEffect(() => {
    if (params.enabled === false) return;
    return mainButton.setup({ text: params.text, onClick: params.onClick });
  }, [params.text, params.onClick, params.enabled]);
}
