# Admin Application

The admin application is the React, Vite, and TypeScript frontend for authenticated
administrative workflows. It provides sign-in, role-filtered routes, and the dashboard.

## Prerequisites

- Node.js 22 or later
- pnpm 11 or later
- An accessible API server

Install workspace dependencies from the repository root:

```bash
pnpm install
```

## Environment

Create the local environment file from the provided example:

```bash
cp apps/admin/.env.example apps/admin/.env
```

The app reads these browser-exposed variables:

- `VITE_API_URL`: API server origin. The client appends `/api`; it defaults to `http://localhost:3000`.
- `VITE_COOKIE_DOMAIN`: Optional cookie domain. Leave empty for local development.
- `VITE_COOKIE_SECURE`: Set to `true` when the application is served over HTTPS.

Restart the Vite server after changing environment variables.

## Commands

Run these commands from the repository root:

```bash
# Start the development server
pnpm --filter admin dev

# Create a production build
pnpm --filter admin build

# Run ESLint
pnpm --filter admin lint

# Serve the production build locally
pnpm --filter admin preview
```

## Authentication and Routing

- `/sign-in` is the public login route.
- A successful login saves access and refresh tokens in cookies, then navigates to `/dashboard`.
- All other routes pass through `ProtectRoute`, which validates the refresh token and retrieves the current user.
- Expired or invalid tokens clear the authentication state and redirect to `/sign-in`.
- `DefaultLayout` renders the application header and only mounts routes permitted for the current user's `userType`.
- The dashboard is available at both `/` and `/dashboard` to the roles configured in `router.ts`.

The application shows a retry action when loading the current user fails.

## Architecture

- React Router provides public and protected route boundaries.
- TanStack Query manages login requests and server-state integration.
- Zustand stores authentication and dashboard state.
- Shared UI, design-system, API-client, and utility packages are consumed through workspace package exports.

## Source Layout

```text
src/
├─ components/       Shared header, user menu, and error boundary
├─ helpers/          Protected-route authentication guard
├─ layout/           Authenticated application shell
├─ reusable/         App-level enums, images, and validation helpers
├─ store/            Zustand store and authentication slice
├─ views/auth/       Sign-in view and carousel
├─ views/dashboard/  Dashboard view, components, widgets, and state
├─ App.tsx           Top-level routes and suspense boundary
├─ main.tsx          Application providers and browser router
└─ router.ts         Route definitions and role permissions
```
