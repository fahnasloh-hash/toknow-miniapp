import type { ReactNode } from 'react';
import { BottomNav } from '@/widgets/bottom-nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
