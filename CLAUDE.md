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
- `src/App.jsx` — the owner/container. Holds `transactions` (seeded with hardcoded sample data — the single source of truth), exposes `addTransaction` and `deleteTransaction` (both use functional `prev =>` updates), and composes the child components: `Summary` on top, then `TransactionList` beside a sidebar of `TransactionForm` and `CategoryChart`. It holds no form or filter state itself.
- `src/components/Summary.jsx` — receives `transactions` and derives `totalIncome`, `totalExpenses`, `balance`, and per-category spending on each render (no own state). Renders a headline sentence, a proportional "flow" strip (spending by category plus what's left over), and the totals.
- `src/components/CategoryChart.jsx` — "Where it went": a horizontal Recharts bar chart of spending by category. Receives `transactions`.
- `src/components/TransactionForm.jsx` — owns the form field state (`description`, `amount`, `type`, `category`), validates (trimmed description, finite amount > 0) and builds a new transaction with `crypto.randomUUID()` as its id and `todayISO()` as its date, then calls the `onAdd` prop and resets. Receives `categories`.
- `src/components/TransactionList.jsx` — owns the filter state (`filterType`, `filterCategory`) and the filtering logic. Receives `transactions`, `categories`, and `onDelete`; renders the filters and table, and confirms with `window.confirm` before calling `onDelete(id)`.
- `src/lib/format.js` — category definitions and display helpers: `CATEGORY_COLORS` (its key order is the dropdown order), `CATEGORIES` (derived from those keys — add a category here, nowhere else), `categoryColor`, `categoryLabel`, `formatMoney`, `formatDate`, and `todayISO`. Use these instead of building `$` strings or dates by hand.
- `src/lib/transactions.js` — `spendingByCategory(transactions)`: expense totals as `[category, total]` pairs, largest first. Shared by `Summary` and `CategoryChart`; don't re-implement the aggregation in components.
- `src/App.css` / `src/index.css` — styling. Design tokens (colors, fonts) are CSS variables on `:root` in `index.css`; fonts load from Google Fonts in `index.html`. Shared classes like `income-amount` / `expense-amount` are used across components.

State ownership pattern: `App` owns the data; each child owns the UI state it alone uses. State flows down as props and changes flow up through the `onAdd` and `onDelete` callbacks. There is no reducer, context, or external store.

Dates are `"YYYY-MM-DD"` strings in **local** time: create them with `todayISO()` (not `toISOString()`, which gives the UTC day) and display them with `formatDate`, which parses them as local dates.

Everything is in-memory: no backend, routing, or persistence, so **data resets on page reload**. A transaction is `{ id, description, amount (number), type ("income"|"expense"), category, date }`.

## The amount-as-number invariant

`amount` must stay a **number** throughout. This was originally a bug — seed data and the form input produced strings, so `reduce((sum, t) => sum + t.amount, 0)` concatenated instead of summing. It's now fixed: seed amounts are numeric literals and `TransactionForm` coerces input with `Number(amount)` before calling `onAdd`. Totals and `spendingByCategory` add `t.amount` directly without re-coercing, so a string amount surfaces as a visible bug rather than being masked — every new transaction source must produce a number.
