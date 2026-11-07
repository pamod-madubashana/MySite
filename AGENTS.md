# AGENTS.md

This file is guidance for coding agents working in `E:\User\Documents\Repositories\MySite`.

## 1) Repository Overview

- Monorepo-style workspace with multiple apps:
  - `Frontend/` -> main React + TypeScript frontend (Vite, Tailwind, shadcn/ui)
  - `Backend/` -> Express + TypeScript API
  - root `package.json` -> convenience scripts for multi-app workflows
- Prefer making changes in the app that the user requested; do not cross-edit apps unless necessary.

## 2) Editor/Assistant Rules

- This `AGENTS.md` file is the source of truth for repository instructions.
- If any instruction differs between other agent files, `AGENTS.md` wins.
- Checked for additional editor/assistant rule files:
  - `.cursorrules`: not found
  - `.cursor/rules/`: not found
  - `.github/copilot-instructions.md`: not found

## 3) Build / Lint / Test Commands

### Root-level commands (run from repository root)

- Install root deps: `npm install`
- Run frontend + backend: `npm run dev`
- Build main frontend: `npm run build`
- Start backend (compiled): `npm run start`

### Main frontend (`Frontend/`)

- Install deps: `cd Frontend && npm install`
- Dev server: `cd Frontend && npm run dev`
- Production build + prerender: `cd Frontend && npm run build`
- Build in dev mode: `cd Frontend && npm run build:dev`
- Generate sitemap only: `cd Frontend && npm run seo:sitemap`
- Preview build: `cd Frontend && npm run preview`
- Lint: `cd Frontend && npm run lint`

### Backend (`Backend/`)

- Install deps: `cd Backend && npm install`
- Dev server: `cd Backend && npm run dev`
- Compile TypeScript: `cd Backend && npm run build`
- Start compiled server: `cd Backend && npm run start`
- Lint: `cd Backend && npm run lint`

### Testing status (important)

- There is currently no test framework configured (no Jest/Vitest/Playwright/Cypress scripts).
- There are no `*.test.*` or `*.spec.*` files in the repo.

### Running a single test

- Not currently possible because no test runner is configured.
- Closest single-file quality check options:
  - Frontend single file lint: `cd Frontend && npx eslint src/path/to/file.tsx`
  - Backend single file lint: `cd Backend && npx eslint src/path/to/file.ts`
- If tests are introduced, add scripts to `package.json` and document exact single-test command here.

## 4) Code Style and Conventions

### General rules

- Keep changes minimal and scoped to the request.
- Do not reformat unrelated files.
- Match existing style in the file you edit (quote style and semicolon usage are mixed across apps).
- Prefer TypeScript-first solutions; avoid introducing plain JS in TS codepaths.

### Imports and module usage

- In `Frontend`, prefer path alias imports using `@/` (configured in tsconfig + Vite).
- In `Backend`, use relative imports (current pattern).
- Keep imports grouped and stable:
  1. external packages
  2. internal aliases/relative modules
  3. type-only imports where useful

### Formatting

- Use readable, consistent formatting; avoid one-line dense logic.
- Keep function and component bodies simple and split complex logic into helpers.
- Avoid large unrelated style-only diffs.

### Types

- Define explicit interfaces/types for API payloads and responses.
- Prefer narrow unions for status-like values (e.g. `'draft' | 'published'`).
- Avoid `any`; if unavoidable, keep usage local and documented by naming/context.
- Reuse existing types from API modules where possible.

### Naming conventions

- React components/pages: `PascalCase`.
- Functions/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` for true constants.
- API/cache keys should be descriptive and namespaced (`feature:subfeature`).

### React/frontend patterns (`Frontend`)

- Use function components and hooks.
- Keep side effects in `useEffect`/`useLayoutEffect`; clean up listeners/timers/animations.
- Keep state minimal; derive filtered/computed values when possible.
- For API calls, centralize logic in `src/api/*` modules rather than inline `fetch` in pages.

### Backend patterns (`Backend`)

- Validate request data (existing pattern: `express-validator`).
- Use early returns for auth/validation failures.
- Return consistent JSON error shapes with proper status codes.
- Keep controllers focused: parse/validate -> service/model call -> response.

### Error handling

- Wrap async IO in `try/catch`.
- Include HTTP status and response text when throwing fetch errors on frontend.
- Log actionable errors for debugging, but avoid leaking secrets/tokens.
- Show user-facing feedback for failures in admin flows (toast, inline error, or clear state).

### Caching and invalidation

- Existing cache utility: `Frontend/src/lib/cache.ts` (`apiCache`, `cacheKeys`).
- Use cache for repeated reads in API modules.
- After any create/update/delete, invalidate related cache keys/patterns.
- Keep invalidation explicit and close to mutation functions.
- For cross-page freshness (e.g. dashboard/admin/public pages), invalidate dependent keys too.

### Security and config

- Never commit secrets or `.env` values.
- Respect server auth flows (`Authorization: Bearer <token>`).
- Keep CORS/auth/rate-limit behavior unchanged unless explicitly requested.

## 5) Agent Workflow Recommendations

- Before editing, inspect the target app's `package.json` scripts and nearby conventions.
- After edits, run relevant lint/build commands for touched app(s).
- Prefer verifying smallest scope first:
  - changed module lint/build
  - then full app build if needed
- Summarize changed files and behavior impact clearly.

## 6) Known Practical Notes

- `Frontend` build includes prerender (`react-snap`), which may log network fetch warnings during static crawl.
