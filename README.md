# Monorepo Architecture

A Turborepo + pnpm workspace with multiple frontend apps and shared packages.

## Tech Stack

- Package manager: pnpm (required)
- Monorepo task runner: Turborepo
- Apps: React + Vite + TypeScript

## Repository Structure

```text
my-monorepo/
├─ apps/
│  ├─ admin/
│  │  ├─ public/
│  │  ├─ src/
│  │  │  ├─ assets/
│  │  │  ├─ components/
│  │  │  ├─ helpers/
│  │  │  ├─ layout/
│  │  │  ├─ reusable/
│  │  │  ├─ store/
│  │  │  ├─ styles/
│  │  │  ├─ theme/
│  │  │  ├─ interfaces/
│  │  │  ├─ views/
│  │  │  ├─ App.tsx
│  │  │  ├─ main.tsx
│  │  │  └─ router.ts
│  │  │  └─ sidebar.ts
│  │  ├─ package.json
│  │  └─ vite.config.ts
│  └─ customer/
│     ├─ public/
│     ├─ src/
│     │  ├─ assets/
│     │  ├─ components/
│     │  ├─ lib/
│     │  ├─ App.css
│     │  ├─ App.tsx
│     │  ├─ index.css
│     │  └─ main.tsx
│     ├─ package.json
│     └─ vite.config.ts
├─ packages/
│  ├─ api-client/
│  │  ├─ client.ts
│  │  ├─ package.json
│  │  └─ services/
│  ├─ ui/
│  │  ├─ components.json
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ components/
│  │     │  ├─ button.tsx
│  │     │  ├─ carousel.tsx
│  │     │  ├─ dropdown-menu.tsx
│  │     │  ├─ input.tsx
│  │     │  ├─ label.tsx
│  │     │  └─ navigation-menu.tsx
│  │     ├─ lib/
│  │     │  └─ utils.ts
│  │     ├─ styles.css
│  │     └─ index.ts
│  ├─ design-system/
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ styles.css
│  │     └─ theme.css
│  ├─ config-tailwind/
│  │  ├─ package.json
│  │  └─ tailwind.config.js
│  ├─ eslint-config/
│  │  ├─ package.json
│  │  └─ index.js
│  ├─ typescript-config/
│  │  ├─ base.json
│  │  ├─ package.json
│  │  └─ vite.json
│  ├─ test-config/
│  │  ├─ package.json
│  │  └─ vitest.config.ts
│  ├─ types/
│  │  └─ auth.interface.ts
│  └─ utils/
│     ├─ package.json
│     └─ src/
│        ├─ cookies.ts
│        └─ index.ts
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ pnpm-lock.yaml
```

## Admin Routing and Access Control

The admin app uses React Router with a protected route boundary:

- `/sign-in` is the public login route.
- Authenticated pages render inside `ProtectRoute` and `DefaultLayout`.
- `/` and `/dashboard` render the dashboard.
- Each route declares permitted roles using `RoleEnum` values (`Admin` and
  `staff`). `DefaultLayout` filters the route list using the authenticated
  user's `userType` before rendering nested routes.
- `useAppStore` combines authentication and dashboard state with Zustand.

See [apps/admin/README.md](apps/admin/README.md) for the app-level flow and
source layout.

## Workspace Layout

- apps/admin: Admin frontend app
- apps/customer: Customer frontend app
- packages/ui: Shared UI components and compiled Tailwind styles
- packages/design-system: Shared Tailwind v4 theme tokens and compiled styles
- packages/config-tailwind: Minimal Tailwind configuration package
- packages/eslint-config: Shared ESLint flat configuration
- packages/typescript-config: Shared TypeScript compiler configurations
- packages/test-config: Shared Vitest configuration for future tests
- packages/api-client: Shared API client and service modules
- packages/types: Shared TypeScript interfaces and types
- packages/utils: Shared utility modules, including cookie helpers

## Admin App Libraries

The admin app includes the following frontend libraries:

- `react-hook-form`: Form state and submission handling
- `@tanstack/react-query`: Server state and data fetching
- `zustand`: Lightweight client state management
- `yup`: Schema validation
- `react-hot-toast`: Toast notifications

## Tailwind CSS

Tailwind v4 tokens are defined in `packages/design-system/src/theme.css`. The
design-system and UI packages compile their CSS with the Tailwind CLI and
export the resulting `dist/styles.css`. Both Vite apps import those package
styles from `src/main.tsx`.

Build the shared styles and apps with:

```bash
pnpm build
```

## Environment

Browser-exposed variables use the `VITE_` prefix. Each app loads environment
variables from its own directory. Copy the example file before starting an
app:

```bash
cp apps/admin/.env.example apps/admin/.env
cp apps/customer/.env.example apps/customer/.env
```

Available variables:

- `VITE_API_URL`: API server origin. `/api` is appended automatically.
- `VITE_COOKIE_DOMAIN`: Optional cookie domain. Leave empty for localhost.
- `VITE_COOKIE_SECURE`: Set to `true` when serving over HTTPS; use `false` for
  local HTTP development.

For example:

```env
VITE_API_URL=http://localhost:3000
VITE_COOKIE_DOMAIN=
VITE_COOKIE_SECURE=false
```

Restart Vite after changing an `.env` file. Turbo tracks `VITE_API_URL` when
caching builds so changes cannot reuse an incompatible result.

## Dependency Boundaries

Workspace packages must be imported through their package exports. Imports from
another package's `src` or `dist` directory, and imports from `apps`, are
reported by the shared ESLint configuration.

## Prerequisites

- Node.js 22+
- pnpm 11+

## Install Dependencies

```bash
pnpm install
```

## Run Development

Run all app dev servers through Turbo:

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Lint

```bash
pnpm lint
```

## Useful Commands

Run command only for one app:

```bash
pnpm --filter admin dev
pnpm --filter customer dev
```

Add dependency to root workspace:

```bash
pnpm add -Dw <package-name>
```

Add dependency to one workspace package/app:

```bash
pnpm --filter admin add <package-name>
pnpm --filter @my-monorepo/ui add <package-name>
```

## Notes

- This repository is configured to use pnpm. Using npm at root can fail because package manager policy enforces pnpm.
- Node modules are ignored by Git from the repository root.
