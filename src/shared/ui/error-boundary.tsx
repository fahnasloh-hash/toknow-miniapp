'use client';

import { Component, type ReactNode } from 'react';
import { Button } from './button';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-6xl">😵‍💫</div>
        <h1 className="text-2xl font-black">Что-то пошло не так</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          {this.state.error.message || 'Неожиданная ошибка'}
        </p>
        <Button onClick={() => window.location.reload()}>Перезагрузить</Button>
      </div>
    );
  }
}
