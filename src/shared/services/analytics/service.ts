import type { AnalyticsEvent, AnalyticsProvider } from './types';

/**
 * Analytics abstraction. Swap `ConsoleProvider` for Amplitude / PostHog / Mixpanel
 * by calling `setAnalyticsProvider(yourProvider)` once at app boot.
 */

class ConsoleProvider implements AnalyticsProvider {
  track(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event.name, event);
  }
  identify(userId: string | number, traits?: Record<string, unknown>) {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line no-console
    console.debug('[analytics:identify]', userId, traits);
  }
}

let provider: AnalyticsProvider = new ConsoleProvider();

export const analytics = {
  track: (event: AnalyticsEvent) => provider.track(event),
  identify: (userId: string | number, traits?: Record<string, unknown>) =>
    provider.identify(userId, traits),
};

export const setAnalyticsProvider = (p: AnalyticsProvider) => {
  provider = p;
};
