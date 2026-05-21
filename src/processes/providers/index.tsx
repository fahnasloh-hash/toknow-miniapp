'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TelegramInit } from '@/processes/telegram-init';
import { ErrorBoundary } from '@/shared/ui/error-boundary';

export function AppProviders({ children }: { children: ReactNode }) {
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={qc}>
        <TelegramInit />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
