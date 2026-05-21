'use client';

import { useEffect, useState } from 'react';
import { Languages, MoonStar, RotateCcw, Sun } from 'lucide-react';
import { Screen, ScreenHeader } from '@/shared/ui/screen';
import { Button } from '@/shared/ui/button';
import { useBackButton } from '@/shared/hooks/use-back-button';
import { useLocaleStore } from '@/shared/i18n/use-t';
import { SUPPORTED_LOCALES } from '@/shared/i18n/dictionaries';
import { useUserStore } from '@/entities/user';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

type ThemeMode = 'system' | 'light' | 'dark';
const THEME_KEY = 'toknow.theme';

export default function SettingsPage() {
  useBackButton();
  const { locale, setLocale } = useLocaleStore();
  const reset = useUserStore((s) => s.reset);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem(THEME_KEY)) as ThemeMode | null;
    if (saved) setTheme(saved);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    haptic.selection();
    setTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
    const root = document.documentElement;
    if (mode === 'system') {
      root.classList.toggle('dark', window.Telegram?.WebApp?.colorScheme === 'dark');
    } else {
      root.classList.toggle('dark', mode === 'dark');
    }
  };

  return (
    <Screen>
      <ScreenHeader title="Настройки" />

      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Тема</h2>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-muted p-1">
          {(
            [
              { id: 'system', label: 'Система', Icon: Languages },
              { id: 'light', label: 'Светлая', Icon: Sun },
              { id: 'dark', label: 'Тёмная', Icon: MoonStar },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => applyTheme(id)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl py-3 text-xs font-semibold transition-colors',
                theme === id ? 'bg-card text-foreground shadow' : 'text-muted-foreground',
              )}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Язык</h2>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                haptic.selection();
                setLocale(l);
              }}
              className={cn(
                'rounded-2xl border p-4 text-base font-semibold transition-colors',
                locale === l
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-card text-muted-foreground',
              )}
            >
              {l === 'ru' ? '🇷🇺 Русский' : '🇬🇧 English'}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Опасная зона</h2>
        {confirmReset ? (
          <div className="space-y-2 rounded-2xl border border-destructive/40 bg-destructive/5 p-4">
            <p className="text-sm">Сбросит онбординг, прогресс, монеты и избранное.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmReset(false)}>
                Отмена
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                hapticType="heavy"
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                  window.location.href = '/';
                }}
              >
                Сбросить
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" size="block" onClick={() => setConfirmReset(true)}>
            <RotateCcw className="size-4" /> Сбросить прогресс
          </Button>
        )}
      </section>
    </Screen>
  );
}
