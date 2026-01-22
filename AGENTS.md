# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js (App Router) app. Key locations:
- `src/app`: route files (`page.tsx`, `layout.tsx`) and global styles.
- `src/db`: database wiring and schema (`schema.ts`).
- `src/lib`: shared helpers (e.g., `utils.ts`).
- `public`: static assets served at `/`.
- `src/proxy.ts`: server-side proxy utilities.
Use the `@/*` path alias for imports from `src` (e.g., `@/db/schema`).

## Build, Test, and Development Commands
Use npm (or an equivalent package manager) with these scripts:
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: production build.
- `npm run start`: serve the production build.
- `npm run lint`: run ESLint with Next.js rules.

## Coding Style & Naming Conventions
- TypeScript + React with strict mode enabled.
- Formatting is enforced by Prettier: 4-space indentation, single quotes,
  no semicolons, `printWidth` 75, trailing commas where valid.
- Follow Next.js conventions for file naming in `src/app`
  (e.g., `page.tsx`, `layout.tsx`).

## Testing Guidelines
No test framework or test files are configured in this repo. If you add tests,
document the framework, naming pattern (e.g., `*.test.ts`), and the command
to run them.

## Commit & Pull Request Guidelines
Only one commit exists (`Initial commit from Create Next App`), so there is no
established commit message convention. Use short, imperative messages and keep
each commit focused.
For pull requests, include:
- A clear description of the change and scope.
- Links to related issues or tasks.
- Screenshots or short clips for UI changes.

## Configuration & Secrets
Environment variables live in `.env`. Do not commit secrets; add new variables
with a short explanation in the PR description.
