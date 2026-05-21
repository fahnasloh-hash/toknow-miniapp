import { Coins } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

type Props = {
  amount: number;
  variant?: 'default' | 'pill';
  className?: string;
};

export function CoinBadge({ amount, variant = 'default', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-bold text-coin',
        variant === 'pill' && 'rounded-full bg-accent/15 px-3 py-1 text-accent-foreground',
        className,
      )}
    >
      <Coins className="size-4 text-coin" strokeWidth={2.5} />
      {amount.toLocaleString('ru-RU')}
    </span>
  );
}
