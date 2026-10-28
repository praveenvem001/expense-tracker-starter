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

- `src/main.jsx` — React 19 entry point; mounts `<App>` in `<StrictMode>` via `createRoot`.
- `src/App.jsx` — the owner/container. Holds `transactions` (seeded with hardcoded sample data — the single source of truth) and the shared `categories` list, exposes `addTransaction`, and composes the three child components. It holds no form or filter state itself.
- `src/components/Summary.jsx` — receives `transactions` and derives `totalIncome`, `totalExpenses`, and `balance` on each render (no own state).
- `src/components/TransactionForm.jsx` — owns the form field state (`description`, `amount`, `type`, `category`), validates and builds a new transaction, then calls the `onAdd` prop and resets. Receives `categories`.
- `src/components/TransactionList.jsx` — owns the filter state (`filterType`, `filterCategory`) and the filtering logic. Receives `transactions` and `categories`, renders the filters and table.
- `src/App.css` / `src/index.css` — styling (shared class names like `summary-card`, `income-amount`, etc. are relied on across components).

State ownership pattern: `App` owns the data; each child owns the UI state it alone uses. State flows down as props and changes flow up through the `onAdd` callback. There is no reducer, context, or external store.

Everything is in-memory: no backend, routing, or persistence, so **data resets on page reload**. A transaction is `{ id, description, amount (number), type ("income"|"expense"), category, date }`.

## The amount-as-number invariant

`amount` must stay a **number** throughout. This was originally a bug — seed data and the form input produced strings, so `reduce((sum, t) => sum + t.amount, 0)` concatenated instead of summing. It's now fixed: seed amounts are numeric literals and `TransactionForm` coerces input with `Number(amount)` before calling `onAdd`. Preserve this when adding any new transaction source.
