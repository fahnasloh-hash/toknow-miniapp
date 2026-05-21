import { tg } from '@/shared/lib/telegram';
import type { AuthSession, TelegramUser } from './types';

/**
 * Client-side Telegram auth service.
 *
 * Responsibilities:
 *  - Reads `initDataUnsafe.user` from the WebApp and exposes a typed session.
 *  - Holds the raw `initData` string so a future backend can HMAC-verify it
 *    (verification MUST happen on the server with the bot token).
 *  - Provides a graceful in-browser fallback for local dev outside Telegram.
 */
class AuthService {
  private session: AuthSession | null = null;
  private subscribers = new Set<(s: AuthSession | null) => void>();

  init(): AuthSession | null {
    const w = tg();
    if (!w) {
      this.session = this.fallbackSession();
      this.notify();
      return this.session;
    }

    const raw = w.initDataUnsafe as { user?: TelegramUser } | undefined;
    if (raw?.user) {
      this.session = {
        user: raw.user,
        initData: w.initData,
        token: null,
        issuedAt: new Date().toISOString(),
      };
    } else {
      this.session = this.fallbackSession();
    }
    this.notify();
    return this.session;
  }

  /** Exchange raw initData for a JWT — wire to `${API_URL}/auth/telegram` on the backend. */
  async exchangeForToken(_endpoint: string): Promise<string | null> {
    // Stub — real impl posts `this.session?.initData` and stores the returned JWT.
    return null;
  }

  current(): AuthSession | null {
    return this.session;
  }

  isAuthenticated(): boolean {
    return this.session !== null;
  }

  subscribe(cb: (s: AuthSession | null) => void): () => void {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  signOut(): void {
    this.session = null;
    this.notify();
  }

  private notify() {
    this.subscribers.forEach((cb) => cb(this.session));
  }

  private fallbackSession(): AuthSession {
    return {
      user: {
        id: 0,
        first_name: 'Guest',
        username: 'guest',
        language_code: 'ru',
      },
      initData: '',
      token: null,
      issuedAt: new Date().toISOString(),
    };
  }
}

export const authService = new AuthService();
