/**
 * Payment abstraction.
 *
 * MVP ships with a `MockPaymentGateway` that resolves successfully after
 * a short delay. When the backend integrates Telegram Stars invoices
 * and TON Connect, swap the implementation behind `paymentGateway()`
 * without touching any UI or feature code.
 */

import { haptic } from '@/shared/lib/telegram';

export type PaymentMethod = 'stars' | 'ton';

export type PaymentRequest = {
  bundleId: string;
  method: PaymentMethod;
  amount: number;
};

export type PaymentResult =
  | { ok: true; method: PaymentMethod; receiptId: string; coinsCredited: number }
  | { ok: false; method: PaymentMethod; error: string; code?: string };

export interface PaymentGateway {
  pay(req: PaymentRequest): Promise<PaymentResult>;
}

class MockPaymentGateway implements PaymentGateway {
  async pay(req: PaymentRequest): Promise<PaymentResult> {
    haptic.medium();
    await new Promise((r) => setTimeout(r, 900));
    return {
      ok: false,
      method: req.method,
      error: 'Магазин монет появится в следующем релизе',
      code: 'NOT_IMPLEMENTED_MVP',
    };
  }
}

/** Swap to a real impl (TelegramStarsGateway, TonConnectGateway, etc.). */
let active: PaymentGateway = new MockPaymentGateway();

export const paymentGateway = (): PaymentGateway => active;
export const setPaymentGateway = (g: PaymentGateway): void => {
  active = g;
};
