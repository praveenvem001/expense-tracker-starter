---
name: deploy
description: Deploy the app to staging. Runs the full test suite, builds the production bundle, then pushes to the staging area. Use when the user asks to deploy, ship, or push to staging.
---

# Deploy

Deploy the finance tracker to staging. Run these steps **in order** and **stop immediately** if any step fails — never build or push on top of a failing step.

## 1. Run all tests

```bash
npm test
```

- If no test runner is configured (this starter ships without one), fall back to `npm run lint` so the code is still checked, and tell the user tests were skipped because no runner is set up.
- If tests (or the lint fallback) fail, **stop here**. Report the failures and do not proceed to build.

## 2. Build the production bundle

```bash
npm run build
```

- This runs `vite build` and outputs to `dist/`.
- Requires Node 20.19+ or 22.12+ (run `nvm use 22` first if the default `node` is older — otherwise Vite crashes with `crypto.hash is not a function`).
- If the build fails, **stop here** and report the error. Do not push.

## 3. Push to staging

Push the freshly built `dist/` to the staging area.

- If a staging deploy command or config exists (e.g. a `deploy:staging` npm script, a CLI like `netlify deploy`/`vercel`/`rsync`, or CI), use it.
- If no staging target is configured yet, **do not guess or invent one** — stop and ask the user how staging should be reached (host, bucket, command, or CI trigger), then record it here for next time.

## After deploying

Report what happened at each step: test result, build result, and where it was pushed (or why it stopped). Be honest if any step was skipped.
