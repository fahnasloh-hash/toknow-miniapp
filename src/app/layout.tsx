import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProviders } from '@/processes/providers';

export const metadata: Metadata = {
  title: 'ToKnow — Telegram Mini App',
  description: 'Карточная игра для глубоких разговоров',
  applicationName: 'ToKnow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF5F0' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1410' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
