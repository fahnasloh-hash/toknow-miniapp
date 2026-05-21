'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Screen, ScreenHeader } from '@/shared/ui/screen';
import { coinRepository, type CoinBundle } from '@/entities/coin';
import { useUserStore } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { CoinBadge } from '@/shared/ui/coin-badge';
import { Sheet } from '@/shared/ui/sheet';
import { useT } from '@/shared/i18n/use-t';
import { paymentGateway, type PaymentMethod } from '@/features/purchase-coins';
import { haptic } from '@/shared/lib/telegram';
import { cn } from '@/shared/lib/cn';

export default function CoinsPage() {
  const t = useT();
  const coins = useUserStore((s) => s.coins);
  const { data: bundles = [] } = useQuery({ queryKey: ['bundles'], queryFn: coinRepository.bundles });

  const [pending, setPending] = useState<{ bundle: CoinBundle; method: PaymentMethod } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const checkout = async (method: PaymentMethod, bundle: CoinBundle) => {
    setBusy(true);
    const res = await paymentGateway().pay({
      bundleId: bundle.id,
      method,
      amount: method === 'stars' ? bundle.prices.stars! : bundle.prices.ton!,
    });
    setBusy(false);
    setResult(res.ok ? 'Готово!' : res.error);
    if (!res.ok) haptic.warning();
    else haptic.success();
  };

  return (
    <Screen>
      <ScreenHeader title={t.coins.title} right={<CoinBadge amount={coins} variant="pill" />} />
      <p className="-mt-2 mb-6 text-sm text-muted-foreground">
        Покупай монеты за Telegram&nbsp;Stars или TON. Полноценный магазин — в следующем релизе.
      </p>

      <div className="space-y-3">
        {bundles.map((b, i) => (
          <motion.button
            key={b.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            type="button"
            onClick={() => {
              haptic.selection();
              setPending({ bundle: b, method: 'stars' });
            }}
            className={cn(
              'relative flex w-full items-center gap-4 rounded-3xl border border-border bg-card p-4 text-left shadow-sm transition-all active:scale-[0.98]',
              b.badge === 'best' && 'border-accent shadow-accent/20',
            )}
          >
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-2xl shadow-md">
              🪙
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold">{b.amount.toLocaleString('ru-RU')}</span>
                {b.bonus && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                    +{b.bonus} бонус
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span>⭐ {b.prices.stars}</span>
                <span>💎 {b.prices.ton} TON</span>
              </div>
            </div>
            {b.badge && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider',
                  b.badge === 'best'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-primary text-primary-foreground',
                )}
              >
                <Sparkles className="size-3" />
                {b.badge === 'best' ? 'Лучшая' : 'Хит'}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <Sheet open={!!pending} onClose={() => setPending(null)}>
        {pending && (
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-2xl font-black">Способ оплаты</h2>
            <p className="text-center text-sm text-muted-foreground">
              {pending.bundle.amount.toLocaleString('ru-RU')} монет
              {pending.bundle.bonus ? ` (+${pending.bundle.bonus})` : ''}
            </p>
            <Button
              size="block"
              hapticType="medium"
              disabled={busy}
              onClick={() => checkout('stars', pending.bundle)}
            >
              ⭐ {t.coins.buyWithStars} · {pending.bundle.prices.stars}
            </Button>
            <Button
              size="block"
              variant="secondary"
              disabled={busy}
              onClick={() => checkout('ton', pending.bundle)}
            >
              💎 {t.coins.buyWithTon} · {pending.bundle.prices.ton}
            </Button>
            {result && (
              <p className="text-center text-sm text-muted-foreground">{result}</p>
            )}
          </div>
        )}
      </Sheet>
    </Screen>
  );
}
