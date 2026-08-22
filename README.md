# My Monorepo

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
│  └─ customer/
├─ packages/
│  ├─ ui/
│  │  ├─ components.json
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ components/
│  │     │  └─ button.tsx
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
│  └─ utils/
│     ├─ package.json
│     └─ src/
│        ├─ cn.ts
│        └─ index.ts
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ pnpm-lock.yaml
```

## Workspace Layout

- apps/admin: Admin frontend app
- apps/customer: Customer frontend app
- packages/ui: Shared UI components and compiled Tailwind styles
- packages/design-system: Shared Tailwind v4 theme tokens and compiled styles
- packages/config-tailwind: Minimal Tailwind configuration package
- packages/eslint-config: Shared ESLint flat configuration
- packages/typescript-config: Shared TypeScript compiler configurations
- packages/test-config: Shared Vitest configuration for future tests
- packages/types: Shared TypeScript types (currently empty)
- packages/utils: Shared utilities

## Tailwind CSS

Tailwind v4 tokens are defined in `packages/design-system/src/theme.css`. The
design-system and UI packages compile their CSS with the Tailwind CLI and
export the resulting `dist/styles.css`. Both Vite apps import those package
styles from `src/main.tsx`.

Build the shared styles and apps with:

```bash
pnpm build
```

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
