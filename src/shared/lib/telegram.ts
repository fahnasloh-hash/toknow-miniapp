/**
 * Thin wrapper around window.Telegram.WebApp.
 * Safe to call on the server — every method no-ops outside the Telegram WebView.
 */

type HapticImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
type HapticNotificationType = 'error' | 'success' | 'warning';

type TgThemeParams = {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
};

type TgWebApp = {
  initData: string;
  initDataUnsafe: Record<string, unknown>;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: TgThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
  enableClosingConfirmation: () => void;
  disableVerticalSwipes?: () => void;
  setHeaderColor: (c: string) => void;
  setBackgroundColor: (c: string) => void;
  onEvent: (event: string, cb: () => void) => void;
  offEvent: (event: string, cb: () => void) => void;
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    setText: (t: string) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    setParams: (p: Partial<{ text: string; color: string; text_color: string; is_active: boolean; is_visible: boolean }>) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: HapticImpactStyle) => void;
    notificationOccurred: (type: HapticNotificationType) => void;
    selectionChanged: () => void;
  };
  openTelegramLink: (url: string) => void;
  openLink: (url: string) => void;
  shareToStory?: (mediaUrl: string) => void;
  showPopup?: (params: { title?: string; message: string; buttons?: { id?: string; type?: string; text?: string }[] }, cb?: (id: string) => void) => void;
  showAlert: (msg: string, cb?: () => void) => void;
  showConfirm: (msg: string, cb?: (ok: boolean) => void) => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

export const tg = (): TgWebApp | null => {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp ?? null;
};

export const haptic = {
  light: () => tg()?.HapticFeedback?.impactOccurred('light'),
  medium: () => tg()?.HapticFeedback?.impactOccurred('medium'),
  heavy: () => tg()?.HapticFeedback?.impactOccurred('heavy'),
  success: () => tg()?.HapticFeedback?.notificationOccurred('success'),
  error: () => tg()?.HapticFeedback?.notificationOccurred('error'),
  warning: () => tg()?.HapticFeedback?.notificationOccurred('warning'),
  selection: () => tg()?.HapticFeedback?.selectionChanged(),
};

export const backButton = {
  show: (cb: () => void) => {
    const w = tg();
    if (!w) return () => {};
    w.BackButton.show();
    w.BackButton.onClick(cb);
    return () => {
      w.BackButton.offClick(cb);
      w.BackButton.hide();
    };
  },
};

export const mainButton = {
  setup: (params: { text: string; onClick: () => void; color?: string }) => {
    const w = tg();
    if (!w) return () => {};
    w.MainButton.setParams({
      text: params.text,
      color: params.color ?? '#FF5722',
      text_color: '#FFFFFF',
      is_active: true,
      is_visible: true,
    });
    w.MainButton.onClick(params.onClick);
    return () => {
      w.MainButton.offClick(params.onClick);
      w.MainButton.hide();
    };
  },
};

export const openTelegramLink = (url: string) => {
  const w = tg();
  if (w) w.openTelegramLink(url);
  else window.open(url, '_blank', 'noopener');
};
