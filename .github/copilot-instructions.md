### Quick Setup & Bootstrap

```bash
# Install dependencies
npm install  # Takes 2 minutes. NEVER CANCEL. Set timeout to 5+ minutes. ALWAYS run this command first since other commands depend on it. Not running this command will cause you to fail. If you can't run this command STOP.

# Start local supabase so that you could test the application
npm run db:setup # Takes 4-6 minutes, environment-dependent reliability. ALWAYS run this command second since other commands depend on it. In case of error retry it up to 3 times. Not running this command will cause you to fail. If you can't run this command STOP.

# Upload sample documents (optional)
npm run docs:upload

# Run linting (always works)
npm run lint  # Takes 1 second. Only minor warnings expected. ALWAYS run this command before you commit. Not running this command can cause you commits to fail.

# Build for production (always works)
npm run build  # Takes 2-3 seconds. Production build. ALWAYS run this command before you commit. Not running this command can cause you commits to fail.

# Run unit tests (always works)
npm run test:run  # Takes 15 seconds. ALL tests should pass. ALWAYS run this command before you commit. Not running this command can cause you commits to fail.

# Start development server (always works)
npm run dev  # Starts in 300ms. Runs on http://localhost:5173
```

### Quick Setup & Bootstrap

```bash
# Install dependencies
npm install  # Takes 2 minutes. NEVER CANCEL. Set timeout to 5+ minutes. ALWAYS run this command first since other commands depend on it. Not running this command will cause you to fail. If you can't run this command STOP.

# Start local supabase so that you could test the application
npm run db:setup # Takes 4-6 minutes, environment-dependent reliability. ALWAYS run this command second since other commands depend on it. In case of error retry it up to 3 times. Not running this command will cause you to fail. If you can't run this command STOP.

# Upload sample documents (optional)
npm run docs:upload

# Run linting (always works)
npm run lint  # Takes 1 second. Only minor warnings expected. ALWAYS run this command before you commit. Not running this command can cause you commits to fail.

# Build for production (always works)
npm run build  # Takes 2-3 seconds. Production build. ALWAYS run this command before you commit. Not running this command can cause you commits to fail.

# Run unit tests (always works)
npm run test:run  # Takes 15 seconds. ALL tests should pass. ALWAYS run this command before you commit. Not running this command can cause you commits to fail.

# Start development server (always works)
npm run dev  # Starts in 300ms. Runs on http://localhost:5173
```
### Development Workflow

Execute the steps in Quick Setup & Bootstrap.

### Working with Database

- **Local database URL**: `postgresql://postgres:postgres@localhost:54322/postgres`
- **API URL**: `http://localhost:54321`
- **Dashboard**: `http://localhost:54323`
- **Database schema**: Uses `properties` table for real estate units

### Key Technologies

- **UI Framework**: Vite + React 18+ + TypeScript 5+
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: TailwindCSS 3+ with responsive design
- **Backend**: Supabase (auth, database, real-time)
- **Testing**: Vitest + React Testing Library + Playwright + MSW
- **Internationalization**: react-i18next (German primary, English fallback)
- **Code Quality**: ESLint + Prettier + Husky pre-commit hooks

### Time Expectations

- **Coding agent session length**: Use up to 120+ minutes when working on a feature.
- **Install**: 2 minutes (NEVER CANCEL - use 5+ minute timeout)
- **Database setup**: 4-6 minutes (NEVER CANCEL - use 15+ minute timeout, environment-dependent. In case of error retry it up to 3 times.)
- **Lint**: 3 second
- **Unit tests**: 15 seconds
- **Build**: 5 seconds
- **Dev server start**: 300ms
- **E2E tests**: 30+ minutes (requires working build)

### Pre-commit Hooks

- Husky automatically runs `lint-staged` on commit
- Formats code with Prettier
- Runs ESLint with auto-fix
- Only commits if quality checks pass
- If commit fails, then check the errors, fix them and then try again

## Critical Notes

- **Always run `npm run lint` before committing** - CI will fail if linting doesn't pass
- **If a precommit hook fail, ALWAYS analyze the git log and fix the underlying issue** - Don't leave partially finished work
- **Build and test before committing** - Run `npm run build` and `npm run test:run` to verify changes
- **Database setup is environment-dependent** - reliability varies by Docker/networking environment. In case of error retry it up to 3 times.
- **Use TypeScript strict mode** - all type definitions in `src/lib/database.types.ts`
- **Path aliases configured**: `@/` maps to `src/`
- **Responsive design**: Support for desktop (1920x1080, 1366x768, 1440x900) and mobile
- **Internationalization**: Extract all text to translation files, never hardcode strings

## Test User Credentials

Test user accounts are available after running `npm run db:setup`:

```
Email: john.doe@example.com      | Password: password | Role: user
Email: jane.doe@example.com      | Password: password | Role: admin
```

## Troubleshooting

- **Build fails**: Run `npm install` first, then check for TypeScript errors
- **Database setup fails**: Check Docker is running and networking allows container communication
  - **Storage bucket error**: Fixed in latest version (removed deprecated `public` column)
  - **Container DNS resolution**: Environment-specific networking issues in CI/restricted environments
  - **Container runtime errors**: Restart Docker daemon or use `docker system prune -f` to clean up
  - **Success after retry**: Database setup often succeeds on second attempt if first fails. If it doesn't work on second try, try once again. If it fails STOP with everything else and report error.
- **Tests fail**: Run `npm install` and ensure dependencies are up to date
- **Type errors**: Regenerate types with `npx supabase gen types typescript --local > src/lib/database.types.ts` (requires working database)
