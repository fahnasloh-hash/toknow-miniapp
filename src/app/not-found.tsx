import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ROUTES } from '@/shared/config/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="text-7xl">🃏</div>
      <h1 className="text-3xl font-black">Карта не найдена</h1>
      <p className="text-sm text-muted-foreground">
        Похоже, эта колода ещё не выпущена. Возвращайся на главную.
      </p>
      <Link href={ROUTES.home}>
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
