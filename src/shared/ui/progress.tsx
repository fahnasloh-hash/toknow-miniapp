import { cn } from '@/shared/lib/cn';

type Props = {
  value: number;
  max?: number;
  className?: string;
  showSteps?: boolean;
};

export function Progress({ value, max = 100, className, showSteps }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
      {showSteps && max > 1 && (
        <div className="absolute inset-0 flex">
          {Array.from({ length: max - 1 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-background/80 last:border-0" />
          ))}
        </div>
      )}
    </div>
  );
}
