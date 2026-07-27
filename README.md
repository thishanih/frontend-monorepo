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
│  │     └─ index.ts
│  ├─ types/
│  └─ utils/
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ pnpm-lock.yaml
```

## Workspace Layout

- apps/admin: Admin frontend app
- apps/customer: Customer frontend app
- packages/ui: Shared UI components package
- packages/types: Shared TypeScript types (currently empty)
- packages/utils: Shared utilities (currently empty)

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
