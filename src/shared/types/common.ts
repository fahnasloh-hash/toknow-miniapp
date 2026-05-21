export type ID = string;

export type Money = {
  amount: number;
  currency: 'COIN' | 'TON' | 'STARS';
};

export type Locked<T> = T & { locked: boolean; lockReason?: string };

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string };
