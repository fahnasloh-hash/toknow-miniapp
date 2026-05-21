# ToKnow — Telegram Mini App

Production-ready MVP scaffold for the **ToKnow** card game inside a Telegram WebApp.

> Stack: **Next.js 15 (App Router) + TypeScript + TailwindCSS + Framer Motion + Zustand + TanStack Query + React Hook Form + Zod**, organised as **Feature-Sliced Design** with **Clean Architecture** separation between UI, features, entities and shared/infra layers.

---

## ✨ What's inside

### User flows

| Flow | Screens |
| --- | --- |
| First launch | Splash → Onboarding (3 swipeable slides) → Initial character pick (1 of 2 active, others locked) |
| Main app | Bottom nav with 5 tabs — Tasks, Heroes, Home, Coins, Decks |
| Tasks | Channel subscribe, Invite 5 friends, Play 1 game, Buy 1 deck, 5-day streak (with streak progress bar) |
| Heroes | Owned vs grayscale-locked, in-app purchase with coins |
| Coins | Star/TON bundles with a swappable `PaymentGateway` abstraction (mocked in MVP) |
| Decks | 3 groups × multiple decks, free / paid / special states, owned/locked overlays, deck detail with question previews |
| Play | Deck picker → loading screen (2 characters + spinner) → sincerity popup → question card (favourite, report, ask-follow-up, exit) → "Don't rush" popup if you skip < 3s → finished screen → feedback form every N games |
| Feedback | 4-step React-Hook-Form + Zod validated survey |
| Favorites | Starred questions, grouped by deck (entry from Home) |
| Settings | Theme (system / light / dark), language (ru / en), full reset |
| 404 | Custom not-found with a friendly card art and link home |

### Telegram WebApp

Implemented in [`src/shared/lib/telegram.ts`](src/shared/lib/telegram.ts) and consumed via hooks:

- `useTelegram()` — boots `WebApp.ready()` / `expand()` / `enableClosingConfirmation()` / `disableVerticalSwipes()` and syncs viewport CSS vars (`--tg-viewport-height`, `--tg-viewport-stable-height`).
- `useBackButton(handler?)` — wires Telegram BackButton to a custom handler or `router.back()`.
- `useMainButton({ text, onClick })` — declarative wrapper around `WebApp.MainButton`.
- `haptic.{light,medium,heavy,success,error,warning,selection}` — thin no-op-safe wrappers around `HapticFeedback`.
- Theme params + `colorScheme` are reflected as `.dark` on `<html>` for Tailwind's `darkMode: 'class'`.
- Safe areas: `env(safe-area-inset-*)` is applied to `<body>`, sticky CTAs, sheets and the bottom nav.
- Zoom is disabled via the viewport meta + `touch-action: manipulation` on `<html>/<body>`.
- All inputs are forced to `font-size: 16px` so iOS doesn't auto-zoom on focus.

### Architecture

```
src/
├── app/                 # Next.js App Router (route segments only)
│   ├── (main)/          # tabbed group: home / tasks / characters / coins / decks / play
│   ├── game/[deckId]/   # full-screen game (no bottom nav)
│   ├── onboarding/
│   ├── select-character/
│   ├── feedback/
│   └── layout.tsx       # mounts Telegram script + providers
├── processes/           # cross-cutting boot logic (TanStack Query, Telegram init)
├── widgets/             # composite blocks (Splash, Onboarding, BottomNav, HomeHero, TaskList, DeckGrid, Game…)
├── features/            # user actions (select-character, purchase-coins, play-game, feedback-form)
├── entities/            # domain models + mock repositories (user store, character, deck, question, task, coin)
└── shared/              # cn(), telegram bridge, ui-kit (Button/Card/Sheet/Progress/CoinBadge/LockOverlay/Screen), config, hooks, i18n, types
```

- **Repositories** (`entities/*/api/repository.ts`) are the only place that holds data today. Swap them for real `fetch` calls once the backend is up — no caller change required.
- **Payments** (`features/purchase-coins/model/payment-gateway.ts`) ship with a `MockPaymentGateway`; just call `setPaymentGateway(new TelegramStarsGateway())` (or TON) on boot.
- **i18n**: `useT()` reads from `useLocaleStore` (persisted Zustand), dictionaries live in `src/shared/i18n/dictionaries.ts` (`ru` + `en` seeded).
- **Theming**: CSS variables driven by `:root` / `.dark` on `<html>`, controlled by Telegram `colorScheme`. Tailwind tokens map to them.
- Data-driven **Tasks** & **Decks** — admins/backend only push new rows; UI renders generically by `kind`/`groupId`.

---

## 🚀 Getting started

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run type-check
npm run format
```

### Git hooks (Husky + lint-staged)

`npm install` runs `husky` which installs a pre-commit hook calling `lint-staged`. On every commit, staged `.ts/.tsx` are auto-fixed by ESLint + Prettier, and `.css/.md/.json` are formatted by Prettier. If you haven't initialised git yet, the hook activates the first time you `git init` + `npm install`.

Open the dev URL inside the Telegram WebApp (set it as your bot's WebApp URL via BotFather, or use [@BotFather → bot settings → menu button](https://t.me/BotFather)). The app degrades gracefully when run outside Telegram — viewport, theme and haptic calls become no-ops.

### Environment

Copy `.env.example` → `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.toknow.example.com
NEXT_PUBLIC_TG_BOT_NAME=ToKnowBot
NEXT_PUBLIC_TG_CHANNEL=@toknow
```

---

## 🧩 Adding content

### A new deck

1. Push a `Deck` object into [`src/entities/deck/api/repository.ts`](src/entities/deck/api/repository.ts) — set `groupId`, `cover`, `background`, `cardBackground`, `cardTextColor`, `kind` (`free | paid | special`), optional `price` and inline `questions`.
2. The UI auto-renders the deck inside its group, with owned/locked states.
3. Replace inline questions with a `fetch('/api/decks/:id/questions')` call when the backend lands.

### A new task

Push a `Task` object into [`src/entities/task/api/repository.ts`](src/entities/task/api/repository.ts). UI maps `kind → emoji/CTA`, streak tasks automatically get the day-by-day progress bar.

### Payment provider

Implement `PaymentGateway` from [`src/features/purchase-coins/model/payment-gateway.ts`](src/features/purchase-coins/model/payment-gateway.ts) and call `setPaymentGateway(yourGateway)` once at boot.

### A new language

Add it to `SUPPORTED_LOCALES` and `DICT` in [`src/shared/i18n/dictionaries.ts`](src/shared/i18n/dictionaries.ts). All components consume `useT()`.

---

## 📐 Notes for design pixel-perfect pass

- All cards use a unified `rounded-3xl` (1rem) corner via `--radius`; tweak in `src/app/globals.css`.
- Brand gradients live in `tailwind.config.ts` (`brand`/`coin`/`gold` tokens).
- Animations are timed in components with `framer-motion` — `spring damping: 24-30`, `duration: 0.25-0.4s` for transitions.

## ✅ Production checklist

- [x] Type-checked (`npx tsc --noEmit`)
- [x] Production build (`npm run build`) succeeds, all 13 routes generated
- [x] Telegram fallbacks (graceful no-op in browser)
- [x] Persisted user state (Zustand + localStorage)
- [x] Safe-area + zoom + viewport handled
- [x] Bottom nav with central CTA and active indicator
- [x] Loading skeletons / shimmer
- [x] Light + dark themes synced with Telegram
- [x] Backend-ready repositories & payment abstraction
- [x] FSD structure with clean dependency direction (`shared ← entities ← features ← widgets ← app`)

---

Made with 🃏 for honest conversations.
