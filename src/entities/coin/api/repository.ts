import type { CoinBundle } from '../model/types';

const BUNDLES: CoinBundle[] = [
  { id: 'b-100', amount: 100, prices: { stars: 49, ton: 0.5 }, badge: null },
  { id: 'b-300', amount: 300, bonus: 30, prices: { stars: 129, ton: 1.4 }, badge: 'popular' },
  { id: 'b-700', amount: 700, bonus: 100, prices: { stars: 279, ton: 3 }, badge: 'best' },
  { id: 'b-1500', amount: 1500, bonus: 250, prices: { stars: 549, ton: 6 } },
];

export const coinRepository = {
  bundles: async (): Promise<CoinBundle[]> => Promise.resolve(BUNDLES),
};
