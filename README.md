# Dev Bible Studio

A short chat-style interview that turns a leader's answers into a config-driven
Bible app. Built as a demo of the flow — the interview is real, the generated
app it hands off to is not (yet).

Modeled after a reference builder-interview spec, but decoupled from it:
audience/faith/language/module choices are driven by editable JSON catalogs,
not hardcoded, and the "build" step is fully mocked (no backend, no auth,
nothing is actually deployed).

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/) as the package manager (`.npmrc` auto-approves the
  `esbuild` install script so `pnpm install` doesn't prompt)

## Getting started

```sh
pnpm install
pnpm dev       # local dev server
pnpm build     # production build to dist/
pnpm preview   # serve the production build locally
```

## How it's structured

- `config/quickstart/*.json` — the wizard's catalogs (audience groups, faith
  levels, languages, modules, per-module questions, a sample BCV-indexed
  resource library). Editing these changes the wizard's behavior with no
  code changes.
- `src/App.tsx` — the wizard itself: phase state machine (audience → faith →
  language → module cart → per-module questions → name → mock build →
  result screen), reading directly from the catalogs above.
- `src/components/` — presentational pieces (welcome screen, step shell/
  progress bar, option cards).
- `src/demo/` — the `/demo/:id` route the wizard's final step links to.
  Currently a static "coming soon" placeholder (`DemoPage.tsx`); `route.ts`
  and `encoding.ts` are structured so that a future version can encode the
  interview answers directly into `id` (shareable, no backend) without
  reworking the routing — see the comments in those two files for the plan.

## Deployment

Deployed via Netlify (`netlify.toml`: `pnpm build` → publish `dist`, with a
catch-all SPA redirect so `/demo/:id` resolves). Intended home for now is
`studio.dev.bible` (see `DEMO_ORIGIN` in `src/demo/route.ts` if that changes).
