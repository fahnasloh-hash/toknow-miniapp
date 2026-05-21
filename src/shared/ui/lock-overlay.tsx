import { Lock } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export function LockOverlay({
  className,
  label,
  hint,
}: {
  className?: string;
  label?: string;
  hint?: string;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[inherit] bg-black/55 text-white backdrop-blur-[2px]',
        className,
      )}
    >
      <Lock className="size-7" strokeWidth={2.5} />
      {label && <span className="text-sm font-semibold">{label}</span>}
      {hint && <span className="px-4 text-center text-xs opacity-80">{hint}</span>}
    </div>
  );
}
