export type CoinBundle = {
  id: string;
  amount: number;
  bonus?: number;
  prices: { stars?: number; ton?: number };
  badge?: 'best' | 'popular' | null;
};
