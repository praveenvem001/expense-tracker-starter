# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Expense/finance tracker — the starter project for a Claude Code course. It **intentionally ships with a bug, rough UI, and messy code** that are fixed over the course of the lessons. Treat existing flaws as expected starting points, not accidents to preserve.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint over all .js/.jsx
```

There is no test runner configured.

## Node version requirement

Vite 7 requires **Node 20.19+ or 22.12+**. The machine's default `node` may be older (v18), which crashes `npm run dev` with `TypeError: crypto.hash is not a function`. If that happens, select a compatible version first, e.g. `nvm use 22`.

## Architecture

The entire application is one component:

- `src/main.jsx` — React 19 entry point; mounts `<App>` in `<StrictMode>` via `createRoot`.
- `src/App.jsx` — **all app logic and markup live here.** A single `App` component holds every piece of state with `useState`:
  - `transactions` — seeded with hardcoded sample data; this is the single source of truth.
  - Form inputs (`description`, `amount`, `type`, `category`) and filters (`filterType`, `filterCategory`).
  - Derived values (`totalIncome`, `totalExpenses`, `balance`, `filteredTransactions`) are computed inline on each render from `transactions` — there is no reducer, context, or external store.
- `src/App.css` / `src/index.css` — styling.

State is entirely in-memory: there is no backend, routing, or persistence, so **data resets on page reload**. A transaction is `{ id, description, amount, type ("income"|"expense"), category, date }`.

## Known intentional bug

In `App.jsx`, `amount` is stored as a **string** (from the number input and the seed data). The income/expense totals use `reduce((sum, t) => sum + t.amount, 0)`, so string concatenation corrupts the sums instead of adding numbers. Fixing this (coercing `amount` to a number) is one of the course's exercises — expect to encounter and address it.
